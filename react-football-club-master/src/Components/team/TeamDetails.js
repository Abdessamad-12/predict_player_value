import React, { useEffect, useState } from "react";
import { getPlayersByTeam } from "../../api";


const TeamDetail = (props) => {
  const teamName = props.match.params.teamName; // Accès aux paramètres de l'URL
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      const data = await getPlayersByTeam(teamName);
      setPlayers(data);
    };
    fetchPlayers();
  }, [teamName]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>{teamName}</h1>
      <h2>List of Players</h2>
      <ul>
        {players.map((player) => (
          <li key={player.id}>
            <strong>{player.name}</strong> - {player.position} -{" "}
            <a href={`/player/${player.id}`}>View Details</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamDetail;
