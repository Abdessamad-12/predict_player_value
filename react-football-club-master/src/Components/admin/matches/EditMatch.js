import React, { useState } from 'react';
import { firebaseMatches } from '../../../firebase'; // Assurez-vous que ce chemin est correct

const EditMatch = () => {
  // État local pour stocker les données du formulaire
  const [matchData, setMatchData] = useState({
    date: '',
    teamA: '',
    teamB: '',
    resultA: '',
    resultB: '',
  });

  // Méthode pour gérer les changements dans les champs de formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMatchData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Méthode pour gérer la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    console.log('Submitting match data:', matchData); // Debug : Affiche les données dans la console
    firebaseMatches.push(matchData) // Ajoute les données dans Firebase
      .then(() => {
        console.log('Match added to Firebase'); // Debug : Confirme l'ajout dans Firebase
        alert('Match added successfully!'); // Alerte en cas de succès
        // Réinitialise le formulaire après ajout
        setMatchData({
          date: '',
          teamA: '',
          teamB: '',
          resultA: '',
          resultB: '',
        });
      })
      .catch((error) => {
        console.error('Error adding match:', error); // Affiche une erreur en cas de problème
      });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Add or Edit Match</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date:</label>
          <input
            type="text"
            name="date"
            value={matchData.date}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Team A:</label>
          <input
            type="text"
            name="teamA"
            value={matchData.teamA}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Team B:</label>
          <input
            type="text"
            name="teamB"
            value={matchData.teamB}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Result A:</label>
          <input
            type="number"
            name="resultA"
            value={matchData.resultA}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Result B:</label>
          <input
            type="number"
            name="resultB"
            value={matchData.resultB}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EditMatch;
