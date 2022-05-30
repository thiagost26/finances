
import firebase from "firebase";
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';



const firebaseConfig = {
    apiKey: "AIzaSyBzJ3vzegf8Hv9GaNaGoxZf2ROFr2ob2kM", 
    authDomain: "finances-224ba.firebaseapp.com",  
    projectId: "finances-224ba",
    storageBucket: "finances-224ba.appspot.com",
    messagingSenderId: "521318831095",
    appId: "1:521318831095:web:5104e3768e48f9ab1194f2",
    measurementId: "G-5MHHQN9WFR"  
  };


  if(!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
  }


  export default firebase;
  