import firebase from 'firebase';
require("@firebase/firestore")

var firebaseConfig = {
  apiKey: "AIzaSyAdQm-s5ci-v-IXD1E78fTFi3CFnU6ts50",
  authDomain: "barter-32dce.firebaseapp.com",
  projectId: "barter-32dce",
  storageBucket: "barter-32dce.appspot.com",
  messagingSenderId: "282444962575",
  appId: "1:282444962575:web:a7e7f9b3554c82f688fc7a"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();