import React from 'react';

const AdminPlayers = () => {
  const players = [
    { id: '1', name: 'Achraf Hakimi', position: 'Defender' },
    { id: '2', name: 'Yassine Bounou', position: 'Goalkeeper' }
  ];

  return (
    <div>
      <h1>Players Management</h1>
      <ul>
        {players.map((player) => (
          <li key={player.id}>
            {player.name} - {player.position}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPlayers;
