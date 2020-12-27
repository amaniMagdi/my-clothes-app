import firebase from "firebase/app"; 
/*firebase/app because I installed the whole firebase , then I will import only the DB "firestore" and auth*/

import "firebase/firestore";
import "firebase/auth";

const config = {
    apiKey: "AIzaSyC6NYRGUbr6WfiNMDPJoyjSlwfFK1bLuP0",
    authDomain: "crwn-db-33bcf.firebaseapp.com",
    databaseURL: "https://crwn-db-33bcf.firebaseio.com",
    projectId: "crwn-db-33bcf",
    storageBucket: "crwn-db-33bcf.appspot.com",
    messagingSenderId: "59723297626",
    appId: "1:59723297626:web:cb2239b19db37e28337963",
    measurementId: "G-TRDVZ163RH"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    if(!snapShot.exists){
      const {displayName, email} = userAuth;
      const createdAt = new Date();
      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData

        })

      }
        catch(error){
            console.log("error creating user", error.message)
        }
    }
    return userRef;
  }
  

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

