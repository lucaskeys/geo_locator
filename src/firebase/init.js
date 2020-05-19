 import firebase from 'firebase'
 import firestore from 'firebase/firestore'
 
 // Your web app's Firebase configuration
 var firebaseConfig = {
  apiKey: "AIzaSyAlrKULzEbcEKOSbRYzr6rVT4kRXUnwDCs",
  authDomain: "geo-location-d5e96.firebaseapp.com",
  databaseURL: "https://geo-location-d5e96.firebaseio.com",
  projectId: "geo-location-d5e96",
  storageBucket: "geo-location-d5e96.appspot.com",
  messagingSenderId: "683085861583",
  appId: "1:683085861583:web:eead38f702359e2fbb5dba"
};
// Initialize Firebase
const firebaseApp =  firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore()