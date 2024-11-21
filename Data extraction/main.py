from ast import parse
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
from bs4 import BeautifulSoup
import time
import requests
import sys
import io


sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')


service = Service('chromedriver.exe')
driver = webdriver.Chrome(service=service)

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

    # Request the page and parse with BeautifulSoup
    response = requests.get(player_url)
    player_html = BeautifulSoup(response.text, 'html.parser')

    # Extract player name from URL as a fallback (sofascore URLs often have player names)
    player_dict['name'] = player_url.split("/")[-2].replace('-', ' ').title()

    # Extract nationality
    nationality_div = player_html.find("div", string="Nationalité")
    if nationality_div:
        nationality_value = nationality_div.find_next("span")
        if nationality_value:
            player_dict['nationality'] = nationality_value.text.strip()
    #team 
    team_div = player_html.find("div", class_="Text leMLNz")
    if team_div:
        team = team_div.text
        player_dict['team'] = team

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
        player_dict['taille'] = taille
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
    print(overall_rating)
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
        print(max_potentiel)
        player_dict['potentiel max']= max_potentiel
    else: 
        max_potentiel = 5.0
        player_dict['potentiel max']= max_potentiel


    # Vérification et calcul de la croissance (growth)
    if max_potentiel is not None and overall_rating is not None:
        growth = max_potentiel - overall_rating
        player_dict['Growth'] = growth
    else:
        growth = 0
        player_dict['Growth'] = growth


    rows = player_html.find_all("div", class_=lambda c: c and "Box Flex BtElW eEu fCo" in c)

    # Extraire les données
    
    for row in rows:
        # Trouver la catégorie (ATT, TEC, etc.)
        category = row.find("span", class_="Text VdZkrV").text.strip()
        # Trouver la valeur associée
        value = row.find("div", class_="Text jbnIiM").text.strip()
        # Ajouter au dictionnaire
        player_dict[category] = value

    

    
    #passe precision 
    passe_precision = player_html.find("span", string="Précision par match")
    if passe_precision:
        passe_precision = passe_precision.find_next("span").text.strip()
        player_dict['passes_Précision'] = passe_precision

    #long passe
    long_passe = player_html.find("span", string="Précision longues passes")
    if long_passe:
        long_passe = long_passe.find_next("span").text.strip()
        player_dict['longue_passe'] = long_passe
    
    

    
    
    #Arrêts par match
    arrets = player_html.find("span", string="Arrêts par match")
    if arrets:
        arrets = arrets.find_next("span").text.strip()
        player_dict['Arrêts_par_match'] = arrets
    else: 
        player_dict["Arrêts_par_match"] = 0


   
    # Fill missing fields with None

    return player_dict



# Loop through each team URL to get player URLs
all_players_urls = {}
team_urls = extract_teams_urls(botola_url)
for team_url in team_urls:
    print(f"Extracting players from: {team_url}")
    players = extract_players_urls(team_url)
    all_players_urls[team_url] = players
    print(f"Found {len(players)} players for team: {team_url}")
    for player_url in players: 
        players_info = extract_player_info(player_url)
        print(f"player : {players_info}")


driver.quit()

# Print all players URLs for each team
for team, players in all_players_urls.items():
    print(f"\nTeam URL: {team}")
    for player in players:
        print(player)