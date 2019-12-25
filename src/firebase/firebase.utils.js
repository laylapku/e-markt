import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBPk1-LIY5XICULFZYJcDLVP34DvgJPUq4",
  authDomain: "e-markt.firebaseapp.com",
  databaseURL: "https://e-markt.firebaseio.com",
  projectId: "e-markt",
  storageBucket: "e-markt.appspot.com",
  messagingSenderId: "930194458292",
  appId: "1:930194458292:web:8de08fa95aa3a12dc679e1"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`); // firebse automatically generates uid for new user -> always able to get ref
  const snapShot = await userRef.get(); // get snapshot of existing user in firestore
  // add new user info to firestore
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
