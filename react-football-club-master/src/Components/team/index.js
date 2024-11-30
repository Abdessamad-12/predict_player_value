import React from 'react';

const TeamPage = () => {
  // Données statiques simulées
  const players = [
    { id: 1, name: 'Jamal Harkass', position: 'Defender' },
    { id: 2, name: 'Youssef El Motie', position: 'Goalkeeper' },
    { id: 3, name: 'Arthur Wenderroscky Sanches', position: 'Midfielder' },
    { id: 4, name: 'M’Baye Niang', position: 'Forward' },
  ];


  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Team Players</h1>
      <div style={styles.playersGrid}>
        {players.map((player) => (
          <div key={player.id} style={styles.playerCard}>
            <div style={styles.playerImage}></div>
            <div style={styles.playerInfo}>
              <h2 style={styles.playerName}>{player.name}</h2>
              <p style={styles.playerPosition}>{player.position}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Styles intégrés
const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
  },
  header: {
    fontSize: '36px',
    color: '#0e1731',
    marginBottom: '20px',
  },
  playersGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
  },
  playerCard: {
    border: '1px solid #ddd',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s',
  },
  playerCardHover: {
    transform: 'scale(1.05)',
  },
  playerImage: {
    height: '150px',
    backgroundColor: '#f4f4f4',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  playerInfo: {
    padding: '10px',
  },
  playerName: {
    fontSize: '20px',
    color: '#0e1731',
    margin: '10px 0',
  },
  playerPosition: {
    fontSize: '16px',
    color: '#555',
  },
};

export default TeamPage;
