// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDY9PmZTHKOdBO9-4HfZPpaYE9mgTN8sNM",
    authDomain: "netflixgpt-13c4c.firebaseapp.com",
    projectId: "netflixgpt-13c4c",
    storageBucket: "netflixgpt-13c4c.appspot.com",
    messagingSenderId: "1010008107382",
    appId: "1:1010008107382:web:6556d30b0d61ae4c4d3257",
    measurementId: "G-7PSDKZG0MJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();