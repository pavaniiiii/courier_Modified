// import firebase from "firebase";

// const firebaseConfig = {
//     apiKey: "AIzaSyAwWSw74vqOEFEw6jd63ybrS9_BAwFsMTk",
//     authDomain: "courier-4cea2.firebaseapp.com",
//     databaseURL: "https://courier-4cea2-default-rtdb.firebaseio.com",
//     projectId: "courier-4cea2",
//     storageBucket: "courier-4cea2.appspot.com",
//     messagingSenderId: "877669940839",
//     appId: "1:877669940839:web:194dd2d449d510fda5dec2"
//   };
  
//   // Initialize Firebase
//  const firebaseDB =  firebase.initializeApp(firebaseConfig);

//  export default firebaseDB.database().ref()



 
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
    apiKey: "AIzaSyBK3mKmXINVc3XQuKEmrfckfHzCrJDq6fg",
    authDomain: "courier-orders.firebaseapp.com",
    databaseURL: "https://courier-orders-default-rtdb.firebaseio.com",
    projectId: "courier-orders",
    storageBucket: "courier-orders.appspot.com",
    messagingSenderId: "1041952576012",
    appId: "1:1041952576012:web:0b22ca52eedeabe9fa9429"
  };

  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app)
  export {db}

