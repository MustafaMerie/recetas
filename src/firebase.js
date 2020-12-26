import firebase from 'firebase'
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAjtmkeDQEYm7EAw58GapTXS9QiJByNii0",
    authDomain: "recetas-5b924.firebaseapp.com",
    databaseURL: "https://recetas-5b924.firebaseio.com",
    projectId: "recetas-5b924",
    storageBucket: "recetas-5b924.appspot.com",
    messagingSenderId: "902518113325",
    appId: "1:902518113325:web:7dba89e807e0c5555da4a4",
    measurementId: "G-0FNLZEJ5J3"
};

const initFirebase = firebase.initializeApp(firebaseConfig)
const db = initFirebase.firestore()
const storage = initFirebase.storage()
const auth = initFirebase.auth()

export { db, storage, auth }