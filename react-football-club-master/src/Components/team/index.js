import React from 'react';
import MAS from '../../Resources/images/image2.png';
import WAC from '../../Resources/images/image3.png';
import RsBerkaneLogo from '../../Resources/images/image1.png';
import Union  from '../../Resources/images/image4.png';
import DHJ from '../../Resources/images/image5.png';
import AS  from '../../Resources/images/image6.png';
import rz  from '../../Resources/images/rz.png';
import husa  from '../../Resources/images/husa.png';
import soualem  from '../../Resources/images/jns.png';
import rca  from '../../Resources/images/rca.png';
import itt  from '../../Resources/images/ittit.png';
import ocs  from '../../Resources/images/ocs.png';
import fus  from '../../Resources/images/fus.png';
import codm  from '../../Resources/images/codm.png';
import mat  from '../../Resources/images/mat.png';
import sccm  from '../../Resources/images/sccm.png';

const TeamPage = () => {
  // Données des équipes avec les photos
  const teams = [
    { id: 1, name: 'RS Berkane', image: RsBerkaneLogo },
    { id: 2, name: 'MAS', image: MAS },
    { id: 3, name: 'WAC', image: WAC },
    { id: 4, name: 'Union Touarga', image: Union  },
    { id: 5, name: 'DHJ', image: DHJ },
    { id: 6, name: 'AS FAR', image: AS  },
    { id: 7, name: 'Renaissance Zemamra', image: rz },
    { id: 8, name: 'HUSA', image: husa},
    { id: 9, name: 'JS Soualem', image: soualem },
    { id: 10, name: 'Raja CA', image: rca },
    { id: 11, name: 'Ittihad Tanger', image: itt },
    { id: 12, name: 'OC Safi', image: ocs },
    { id: 13, name: 'FUS Rabat', image: fus },
    { id: 14, name: 'CODM', image: codm },
    { id: 15, name: 'Moghreb Tetouan', image: mat },
    { id: 16, name: 'SCCM', image: sccm },
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Teams of Botola Pro</h1>
      <div style={styles.teamsGrid}>
        {teams.map((team) => (
          <div key={team.id} style={styles.teamCard}>
           <div
           style={{
           ...styles.teamLogo, // La virgule est ajoutée ici
            backgroundImage: `url(${team.image})`,
          }}
          ></div>

            <h2 style={styles.teamName}>{team.name}</h2>
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
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: '36px',
    color: '#0e1731',
    marginBottom: '30px',
    fontWeight: 'bold',
  },
  teamsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
  },
  teamCard: {
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    transition: 'transform 0.3s',
    cursor: 'pointer',
  },
  teamCardHover: {
    transform: 'scale(1.05)',
  },
  teamLogo: {
    width: '100px',
    height: '100px',
    margin: '0 auto 10px',
    borderRadius: '50%',
    backgroundColor: '#e0e0e0',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  teamName: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#0e1731',
  },
};

export default TeamPage;
