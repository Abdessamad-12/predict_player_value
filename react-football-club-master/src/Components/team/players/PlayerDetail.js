import React, { useEffect, useState } from "react";
import { getPlayerById } from "../../../api";

const PlayerDetail = (props) => {
  const playerId = props.match.params.playerId; // Accès via props.match.params
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const data = await getPlayerById(playerId);
        setPlayer(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données du joueur :", error);
      }
    };

    fetchPlayer();
  }, [playerId]);

  if (!player) return <p>Chargement...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{player.name}</h1>
      <p>Âge : {player.age}</p>
      <p>Position : {player.position}</p>
      <p>Nationalité : {player.nationality}</p>
      <p>Équipe : {player.team}</p>
      <p>Note globale : {player.overall_rating}</p>
      <p>Valeur actuelle : {player.currentValue}</p>
      <p>Valeur prédite : {player.predictedValue}</p>
    </div>
  );
};

export default PlayerDetail;
