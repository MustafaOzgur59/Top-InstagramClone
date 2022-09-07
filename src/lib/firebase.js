import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { seedDatabase } from "../seed";

const config = {
  apiKey: "AIzaSyBcEAmhHxiVnI2nH-k_UaO0XBnY8p0-VX4",
  authDomain: "instagramclone-d781a.firebaseapp.com",
  projectId: "instagramclone-d781a",
  storageBucket: "instagramclone-d781a.appspot.com",
  messagingSenderId: "988905939429",
  appId: "1:988905939429:web:b30cba5ebba63aa0804f0c",
};

const firebase2 = firebase.initializeApp(config);

const { FieldValue } = firebase.firestore;
// console.log("seeding database");
// seedDatabase(firebase);

export { firebase2 as firebase, FieldValue };
