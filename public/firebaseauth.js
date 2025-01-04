 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
 import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-analytics.js";
 import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js"
 import {getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js"

 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
 const firebaseConfig = {

   apiKey: "AIzaSyC8sb8NkxhgY0vBp1iaCHTU4tuWoxEKTYQ",
   authDomain: "capstroke-18db8.firebaseapp.com",
   databaseURL: "https://capstroke-18db8-default-rtdb.firebaseio.com",
   projectId: "capstroke-18db8",
   storageBucket: "capstroke-18db8.appspot.com",
   messagingSenderId: "147049881807",
   appId: "1:147049881807:web:2eab2d39ddd824ad0ad7ba",
   measurementId: "G-9JDF94P1FM"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const analytics = getAnalytics(app);

 function showMessage(message, divId){
    var messageDiv=document.getElementById(divId);
    messageDiv.style.display="block";
    messageDiv.innerHTML=message;
    messageDiv.style.opacity=1;
    setTimeout(function(){
        messageDiv.style.opacity=0;
    },5000);
 }

 const signUp=document.getElementById('submitSignUp');
 signUp.addEventListener('click', (event)=>{
    event.preventDefault();
    const name=document.getElementById('rname').value;
    const SID=document.getElementById('rsid').value;
    const email=document.getElementById('remail').value;
    const password=document.getElementById('rpw').value;

    const auth=getAuth();
    const db=getFirestore();

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
        const user=userCredential.user;
        const userData={
            email: email,
            SID: SID
        };
        showMessage('Account Created Successfully', 'signUpMessage');
        const docRef=doc(db, "users", user.uid);
        setDoc(docRef, userData)
        .then(()=>{
            window.location.href='signup.html';

        })
        .catch((error)=>{
            console.error("error writing document", error);
        });
    })
    .catch((error)=>{
        const errorCode=error.code;
        if(errorCode=='auth/email-already-in-use'){
            showMessage('Email Address Already Exists !!!', 'signUpMessage');
        }
        else{
            showMessage('unable to create User', 'signUpMessage');
        }
    })
 });

 const signIn = document.getElementById('submitSignIn');
 signIn.addEventListener('click', (event) => {
     event.preventDefault();
     const email = document.getElementById('em').value;
     const password = document.getElementById('pass').value;
     const auth = getAuth();
 
     signInWithEmailAndPassword(auth, email, password)
         .then((userCredential) => {
             showMessage('Login is successful', 'signInMessage');
             const user = userCredential.user;
             localStorage.setItem('loggedInUserId', user.uid);
             window.location.href = 'homepage.html';
         })
         .catch((error) => {
             const errorCode = error.code;
             if (errorCode === 'auth/invalid-credential') {
                 showMessage('Incorrect Email or Password', 'signInMessage');
             } else {
                 showMessage('Account does not Exist', 'signInMessage');
             }
         });
 });
 