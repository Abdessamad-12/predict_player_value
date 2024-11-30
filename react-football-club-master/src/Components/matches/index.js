import React, { useState, useEffect } from "react";
import axios from "axios";

const MatchesPage = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLiveMatches = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/matches/live");
      setMatches(response.data || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching live match data:", error);
      setLoading(false);
    }
  };  

  useEffect(() => {
    fetchLiveMatches();
    const interval = setInterval(fetchLiveMatches, 60000); // Refresh data every 60 seconds
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  if (loading) {
    return <p>Loading live matches...</p>;
  }

  if (matches.length === 0) {
    return <p>No live matches right now.</p>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Live Matches</h1>
      <div style={styles.matchesGrid}>
        {matches.map((match) => (
          <div key={match.fixture.id} style={styles.matchCard}>
            <div style={styles.team}>
              <h3>{match.teams.home.name}</h3>
              <span style={styles.score}>{match.goals.home}</span>
            </div>
            <div style={styles.vs}>VS</div>
            <div style={styles.team}>
              <h3>{match.teams.away.name}</h3>
              <span style={styles.score}>{match.goals.away}</span>
            </div>
            <p style={styles.date}>
              {new Date(match.fixture.date).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
  },
  header: {
    fontSize: "36px",
    marginBottom: "20px",
    color: "#333",
  },
  matchesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
  },
  matchCard: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f9f9f9",
  },
  team: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  score: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#555",
  },
  vs: {
    textAlign: "center",
    margin: "10px 0",
    fontSize: "18px",
    color: "#888",
  },
  date: {
    marginTop: "10px",
    fontSize: "14px",
    color: "#999",
  },
};

export default MatchesPage;
