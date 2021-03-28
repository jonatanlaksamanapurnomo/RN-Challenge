import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBMXtYZgvutJ1Y-8sbqnoqsfHwSZAIwjBA",
    authDomain: "test-65058.firebaseapp.com",
    databaseURL: "https://test-65058.firebaseio.com",
    projectId: "test-65058",
    storageBucket: "test-65058.appspot.com",
    messagingSenderId: "439022184408",
    appId: "1:439022184408:web:a769c54c836d0c658fb4ad",
    measurementId: "G-S557K5E8LP"
};
firebase.initializeApp(firebaseConfig);

export default firebase;