import React from 'react';
import { withRouter } from 'react-router-dom';

const teams = [
  {
    id: 1,
    name: 'RS Berkane',
    logo: '/images/rsberkane.png',
    players: [
      { id: 101, name: 'Player 1' },
      { id: 102, name: 'Player 2' },
    ],
  },
  {
    id: 2,
    name: 'MAS',
    logo: '/images/mas.png',
    players: [
      { id: 201, name: 'Player A' },
      { id: 202, name: 'Player B' },
    ],
  },
];

const TeamDetails = (props) => {
  const id = props.match.params.id;
  const team = teams.find((team) => team.id === parseInt(id));

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      {team ? (
        <div>
          <h1>{team.name}</h1>
          <img
            src={team.logo}
            alt={`${team.name} Logo`}
            style={{ width: '150px', height: '150px' }}
          />
          <h2>Joueurs</h2>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {team.players.map((player) => (
              <li
                key={player.id}
                style={{
                  margin: '10px 0',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  maxWidth: '300px',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                {player.name}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Équipe introuvable !</p>
      )}
    </div>
  );
};

export default withRouter(TeamDetails);
