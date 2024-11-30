import re
import time
import psycopg2
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from bs4 import BeautifulSoup

# Configurations de la base de données PostgreSQL
DB_HOST = "localhost"
DB_PORT = "5432"
DB_NAME = "predictiondb"
DB_USER = "predictiondb"
DB_PASSWORD = "akharaz"

# Configurer le service WebDriver pour Selenium
service = Service('chromedriver.exe')
driver = webdriver.Chrome(service=service)

# URL de la Botola Pro sur Sofascore
botola_url = 'https://www.sofascore.com/fr/tournoi/football/morocco/botola-pro/937#id:65433,tab:media'

# Fonction pour extraire les URL des équipes
def extract_teams_urls(league_url):
    team_list = []
    driver.get(league_url)
    time.sleep(5)
    team_html = BeautifulSoup(driver.page_source, 'html.parser')
    all_teams_html = team_html.find_all("a", href=True)
    for link in all_teams_html:
        href = link['href']
        if '/equipe/' in href:
            full_url = "https://www.sofascore.com" + href
            team_list.append(full_url)
    return sorted(set(team_list))

# Fonction pour extraire les URL des joueurs d'une équipe
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
    return list(set(player_urls))

# Fonction pour extraire les informations d'un joueur
def extract_player_info(player_url):
    player_dict = {}
    driver.get(player_url)
    time.sleep(3)
    player_html = BeautifulSoup(driver.page_source, 'html.parser')

    # Nom du joueur
    name = player_html.find("h2", class_="Text cuNqBu")
    player_dict['name'] = name.text if name else "Unknown"

    # Âge
    age_div = player_html.find_all("div", class_='Text beCNLk')
    for div in age_div:
        if "ans" in div.text:
            age_value = div.text.strip()
            player_dict['age'] = int(''.join(filter(str.isdigit, age_value)))
            break

    # Équipe
    team_div = player_html.find("div", class_="Text leMLNz")
    player_dict['team'] = team_div.text if team_div else "Unknown"

    # Nationalité
    nationality_div = player_html.find("div", string="Nationalité")
    if nationality_div:
        nationality_value = nationality_div.find_next("span")
        player_dict['nationality'] = nationality_value.text.strip() if nationality_value else "Unknown"

    # Taille
    taille_div = player_html.find("div", string="Taille")
    if taille_div:
        taille_value = taille_div.find_next("div").text.strip()
        match = re.search(r"\d+", taille_value)
        player_dict['taille'] = int(match.group()) if match else None

    # Pied préféré
    preferred_foot_div = player_html.find("div", string="Pied préféré")
    if preferred_foot_div:
        preferred_foot_value = preferred_foot_div.find_next("div").text.strip()
        player_dict['preferred_foot'] = preferred_foot_value

    # Valeur actuelle
    valeur_actuelle = player_html.find("div", class_="Text imGAlA")
    player_dict['valeur_actuelle'] = valeur_actuelle.text.strip() if valeur_actuelle else None

    # Note globale
    overall_rating = player_html.find("div", class_="Box klGMtt")
    if overall_rating:
        rating_span = overall_rating.find("span")
        player_dict['overall_rating'] = float(rating_span.text.strip()) if rating_span else 5.0

    # Performance (ATT, TAC, TEC, etc.)
    elements = player_html.find_all("span", class_='Text VdzKr')
    values = player_html.find_all("div", class_='Text jbniIM')

    performance_params = ["AER", "ANT", "ATT", "TAC", "TEC", "SAV", "BAL", "DEF", "CRE"]
    elements_text = [el.text.strip() for el in elements]
    values_text = [val.text.strip() for val in values]

    # Remplir les performances dans le dictionnaire
    for key, value in zip(elements_text, values_text):
        key_clean = key.upper()  # Convertir en majuscules pour correspondre à la base
        if key_clean in performance_params:
            try:
                player_dict[key_clean] = float(value)
            except ValueError:
                player_dict[key_clean] = 0.0  # Valeur par défaut si le parsing échoue

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

# Main Script
players_list = []
team_urls = extract_teams_urls(botola_url)
for team_url in team_urls:
    player_urls = extract_players_urls(team_url)
    for player_url in player_urls:
        player_info = extract_player_info(player_url)
        players_list.append(player_info)

# Insérer les données dans PostgreSQL
insert_into_postgresql(players_list)

# Fermer le WebDriver
driver.quit()
