
from ast import parse
import re
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
from bs4 import BeautifulSoup
import time
import psycopg2
import requests
import sys
import io
import csv


sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')



# Configurations de la base de données PostgreSQL
DB_HOST = "localhost"
DB_PORT = "5432"
DB_NAME = "predictiondb"
DB_USER = "predictiondb"
DB_PASSWORD = "akharaz"

service = Service('chromedriver.exe')
driver = webdriver.Chrome(service=service)
output_file = "players_data.csv"
players_list = []

# Navigate to the webpage
botola_url = 'https://www.sofascore.com/fr/tournoi/football/morocco/botola-pro/937#id:65433,tab:media'



def extract_teams_urls(league_url):
    team_list = []
    driver.get(league_url)  
    
    
    time.sleep(5) 

    # Use BeautifulSoup to parse the page source after loading
    team_html = BeautifulSoup(driver.page_source, 'html.parser')  
    
    # Locate all links to teams in the standings (update the class or tag as per actual HTML structure)
    all_teams_html = team_html.find_all("a", href=True)  

    for link in all_teams_html:
        href = link['href']
        if '/equipe/' in href: 
            full_url = "https://www.sofascore.com" + href
            team_list.append(full_url)

    # Remove duplicates and sort the list
    sorted_teams = sorted(set(team_list))
    return sorted_teams



def extract_players_urls(team_url):
    player_urls = []
    driver.get(team_url)
    
    
    time.sleep(3) 

 
    team_page = BeautifulSoup(driver.page_source, 'html.parser')
    

    all_player_links = team_page.find_all("a", href=True)
    
    for link in all_player_links:
        href = link['href']
        if '/joueurs/' in href:  
            full_url = "https://www.sofascore.com" + href
            player_urls.append(full_url)
    
    # Remove duplicates
    player_urls = list(set(player_urls))
    return player_urls



def extract_player_info(player_url):
    """
    Extracts information about a player from their profile page on sofascore.com.
    
    :param player_url: URL of the player's profile page on sofascore.com
    :return: Dictionary with player information, including name, nationality, birth date, height, preferred foot, 
             position, shirt number, and other relevant stats.
    """
    player_dict = {}

    driver.get(player_url)

    page_source = driver.page_source 
    player_html = BeautifulSoup(page_source, 'html.parser')

    # Extract player name 
    
    name = player_html.find("h2", class_= "Text cuNqBu")
    if name:
        name = name.text
        
        player_dict['name'] = name

    # age
    age_div = player_html.find_all("div", class_='Text beCNLk')
    for div in age_div:
        if "ans" in div.text:
            age_value = div.text.strip()
            try:
                player_dict['age'] = int(''.join(filter(str.isdigit, age_value)))
            except ValueError:
                player_dict['age'] = age_value
            break

    #team 
    team_div = player_html.find("div", class_="Text leMLNz")
    if team_div:
        team = team_div.text
        player_dict['team'] = team


    #nationalite

    nationality_div = player_html.find("div", string="Nationalité")
    if nationality_div:
        nationality_value = nationality_div.find_next("span")
        if nationality_value:
            player_dict['nationality'] = nationality_value.text.strip()

        
    elements = player_html.find_all("span", class_='Text VdzKr')
    values = player_html.find_all("div", class_='Text jbniIM')
    # Créer une liste des textes nettoyés
    elements_text = [el.text.strip() for el in elements]
    values_text = [val.text.strip() for val in values]
    # Construire le dictionnaire
    player_dict = {key: value for key, value in zip(elements_text, values_text)}
    # Afficher le dictionnaire
    

    
    

    # Extract preferred foot
    preferred_foot_div = player_html.find("div", string="Pied préféré")
    if preferred_foot_div:
        preferred_foot_value = preferred_foot_div.find_next("div").text.strip()
        player_dict['preferred_foot'] = preferred_foot_value
    # Extract position
    position_div = player_html.find("div", string="Poste")
    if position_div:
        position_value = position_div.find_next("div").text.strip()
        player_dict['position'] = position_value

    #extract taille
    taille = player_html.find("div", string="Taille" )
    if taille:
        taille = taille.find_next("div").text.strip()
        match = re.search(r"\d+", taille)
        if match:
            player_dict['taille'] = int(match.group())  # Convertir en entier
        else:
            player_dict['taille'] = None  # Pas de nombre trouvé
    else:
        player_dict['taille'] = None
    #valeur actuelle 
    valeur_actuelle = player_html.find("div", class_="Text imGAlA")
    if valeur_actuelle:
        valeur_actuelle = valeur_actuelle.text.strip()
        player_dict['valeur_actuelle'] = valeur_actuelle
    else : 
        player_dict['valeur_actuelle'] = None



    # Overall rating
    overall_rating = player_html.find("div", class_="Box klGMtt sc-eldPxv hizNAI animation-complete")

    if overall_rating:
        span = overall_rating.find_next("span")
        potential_text = span.text.strip()  # Extract the text
        player_dict['Overall rating'] = float(potential_text)
    else: 
        overall_rating = 5.0
        player_dict['Overall rating'] = overall_rating
    #total value
    sections = player_html.find_all("div", class_="Box kUyWOp")
    # Extraire les valeurs des potentiels
    potentiel_values = []
    for section in sections:
        try:
            divs = section.find_all("div")
            for div in divs:
                text = div.text.strip()
                if text.replace(".", "", 1).isdigit():  # Vérifie si le texte est un nombre (y compris flottant)
                    value = float(text)
                    potentiel_values.append(value)
        except (ValueError, AttributeError):
            continue
    if potentiel_values:
        max_potentiel = max(potentiel_values)

        player_dict['potentiel max']= max_potentiel
    else: 
        max_potentiel = 5.0
        player_dict['potentiel max']= max_potentiel


    #passe precision 
    passe_precision = player_html.find("span", string="Précision par match")
    if passe_precision:
        passe_precision = passe_precision.find_next("span").text.strip()
        player_dict['passes_Precision'] = passe_precision
    #long passe
    long_passe = player_html.find("span", string="Précision longues passes")
    if long_passe:
        long_passe = long_passe.find_next("span").text.strip()
        player_dict['longue_passe'] = long_passe




    #Arrêts par match
    arrets = player_html.find("span", string="Arrêts par match")
    if arrets:
        arrets = arrets.find_next("span").text.strip()
        player_dict['Arrets_par_match'] = arrets
    else: 
        player_dict["Arrets_par_match"] = 0

    return player_dict

# Fonction pour insérer les données dans PostgreSQL
def insert_into_postgresql(players_list):
    try:
        # Connexion à la base de données
        conn = psycopg2.connect(
            host=DB_HOST, port=DB_PORT, database=DB_NAME, user=DB_USER, password=DB_PASSWORD
        )
        cursor = conn.cursor()

        # Requête d'insertion
        insert_query = """
        INSERT INTO players (
            name, age, nationality, taille, preferred_foot, team, AER, ANT, ATT, TAC, TEC, SAV, BAL, DEF, CRE,
            overall_rating, valeur_actuelle
        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """

        for player in players_list:
            cursor.execute(insert_query, (
                player.get('name', None),
                player.get('age', None),
                player.get('nationality', None),
                player.get('taille', None),
                player.get('preferred_foot', None),
                player.get('team', None),
                player.get('AER', 0.0),
                player.get('ANT', 0.0),
                player.get('ATT', 0.0),
                player.get('TAC', 0.0),
                player.get('TEC', 0.0),
                player.get('SAV', 0.0),
                player.get('BAL', 0.0),
                player.get('DEF', 0.0),
                player.get('CRE', 0.0),
                player.get('overall_rating', 0.0),
                player.get('valeur_actuelle', None),
            ))

        conn.commit()
        print(f"{len(players_list)} players inserted successfully into PostgreSQL.")
    except Exception as e:
        print("Error inserting into PostgreSQL:", e)
    finally:
        cursor.close()
        conn.close()


# Loop through each team URL to get player URLs
all_players_urls = {}
team_urls = extract_teams_urls(botola_url)
for team_url in team_urls:
    print(f"Extracting players from: {team_url}")
    players = extract_players_urls(team_url)
    all_players_urls[team_url] = players
    print(f"Found {len(players)} players for team: {team_url}")
    all_keys = set()
    for player_url in players: 
        player_info = extract_player_info(player_url)
        players_list.append(player_info)
        #print(f"player : {player_info}")
# Insérer les données dans PostgreSQL
insert_into_postgresql(players_list)

print(players_list)
all_keys = set()
for player in players_list:
    all_keys.update(player.keys())


with open(output_file, mode='w', newline='', encoding='utf-8') as csv_file:
    writer = csv.DictWriter(csv_file, fieldnames=sorted(all_keys))
    writer.writeheader()  # Écrire les en-têtes
    for player in players_list:
        writer.writerow(player)  # Remplir les valeurs manquantes avec None automatiquement



driver.quit()
    
