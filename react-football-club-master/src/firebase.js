import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const config = {
    apiKey: "FIREBASE_API_KEY",
    authDomain: "react-footbal-club.firebaseapp.com",
    databaseURL: "https://react-footbal-club.firebaseio.com",
    projectId: "react-footbal-club",
    storageBucket: "react-footbal-club.appspot.com",
    messagingSenderId: "944787732534"
};

firebase.initializeApp(config);

const firebaseDB = firebase.database();
const firebaseMatches = firebaseDB.ref('matches');
const firebasePromotions = firebaseDB.ref('promotions');

export {
  firebase,
  firebaseDB, // Ajout de firebaseDB dans les exports
  firebaseMatches,
  firebasePromotions
};

// Exemple pour vérifier les données dans Firebase (optionnel)
// firebaseDB.ref('matches').once('value')
// .then((snapshot) => {
//   console.log(snapshot.val());
// });