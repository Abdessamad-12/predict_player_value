import { Link } from 'react-router-dom';

const TeamPage = () => {
  const teams = [
    { id: 1, name: 'RS Berkane', logo: '/images/rsberkane.png' },
    { id: 2, name: 'MAS', logo: '/images/mas.png' },
    // Ajoutez les autres équipes
  ];

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Les équipes de Botola Pro</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '20px' }}>
        {teams.map((team) => (
          <Link to={`/team/${team.id}`} key={team.id} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div
              style={{
                border: '1px solid #ddd',
                borderRadius: '10px',
                padding: '10px',
                textAlign: 'center',
              }}
            >
              <img
                src={team.logo}
                alt={team.name}
                style={{ width: '100px', height: '100px' }}
              />
              <h2 style={{ margin: '10px 0', fontSize: '18px' }}>{team.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TeamPage;
