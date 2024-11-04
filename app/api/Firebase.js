// const admin = require('firebase-admin');
// const serviceAccount = require('./firebasecred.json');
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// export default admin;

import { initializeApp, getApps } from "firebase/app";


const firebaseConfig = {
    apiKey: "AIzaSyABUIfNAcWqjT9Wf1wT5CuSwOPBEQr-_5A",
    authDomain: "codebasemangagement.firebaseapp.com",
    projectId: "codebasemangagement",
    storageBucket: "codebasemangagement.appspot.com",
    messagingSenderId: "864533996828",
    appId: "1:864533996828:web:6fa5a2b2d828a47aafc6d9"
  };

let fireBaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export default fireBaseApp;

