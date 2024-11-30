import axios from "axios";

const API_URL = "http://localhost:8080/api/players";

// Récupérer les joueurs par nom d'équipe
export const getPlayersByTeam = async (teamName) => {
  try {
    const response = await axios.get(`${API_URL}/team/${teamName}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des joueurs :", error);
    return [];
  }
};

// Récupérer les détails d'un joueur spécifique
export const getPlayerById = async (playerId) => {
  try {
    const response = await axios.get(`${API_URL}/${playerId}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération du joueur :", error);
    return null;
  }
};
