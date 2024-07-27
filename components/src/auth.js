import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const firebaseConfig = {
  authDomain: "uber-clone-beryl-pi.vercel.app",
  apiKey: "AIzaSyDNWqSQmH2Zsc0-4JyXZ-pz2qE3dGxKkZE",
  authDomain: "authentication-e64d8.firebaseapp.com",
  projectId: "authentication-e64d8",
  storageBucket: "authentication-e64d8.appspot.com",
  messagingSenderId: "1065149139319",
  appId: "1:1065149139319:web:9a2f23260e1df068a6f972",
};
const user = {
  email: "",
  password: "",
};
const ggl = document.getElementById("authenticate");
const submit = document.getElementById("form");
const message = document.getElementById("signUpMessage");

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
auth.languageCode = "en";
const provider = new GoogleAuthProvider();

ggl.addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      // The signed-in user info.
      const user = result.user;
      console.log(credential);
      // IdP data available using getAdditionalUserInfo(result)
      // ...
      window.location.href = "./dashboard.html";
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      // ...
    });
});

const text = document.getElementById("success");
submit.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("Email");
  const password = document.getElementById("pword");
  // const pvalue = password.value
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((credential) => {
      console.log("user created: ", credential.user);
      submit.reset();
      user.email = email.value;
      user.password = password.value;
      console.log(user);
      message.style.display = "flex";
      message.style.alignItems = "center";
      message.style.justifyContent = "space-around";
      let count = 1;
      setInterval(() => {
        count++;

        if (count > 6) {
          window.location.href = "logIn.html";
        }
      });
      // message.style.display = 'none'
    })
    .catch((err) => {
      console.log(err.message);
      // message.innerText = err.message
      if (err.message == "Firebase: Error (auth/invalid-email).") {
        text.innerText = "invalid email/password";
      }
      if (err.message == "Firebase: Error (auth/missing-password)..") {
        message.innerText = "password required";
      }
      message.style.display = "flex";
      message.style.alignItems = "center";
      message.style.justifyContent = "space-around";
      message.style.backgroundColor = "red";
    });
});

const cancel = document.getElementById("cancel");

cancel.addEventListener("click", () => {
  message.style.display = "none";
});
const logInEmail = document.getElementById("LEmail");
const logInPassword = document.getElementById("Lpword");
const loginSubmit = document.getElementById("Lsubmit");

const logInFunction = () => {
  const userEmail = logInEmail.value;
  const userPword = logInPassword.value;

  const userCredentials = signInWithEmailAndPassword(auth, userEmail, userPword)
    .then(() => {
      console.log(userCredentials.user);
      setInterval(() => {
        window.location.href = "dashboard.html";
      }, 1000);
    })
    .catch((err) => {
      console.log(err);
      if (err == "FirebaseError: Firebase: Error (auth/invalid-email).") {
        console.log("invalid email/password");
      } else if (
        err == "FirebaseError: Firebase: Error (auth/missing-password)."
      ) {
        console.log("password required");
      } else if (
        err == "FirebaseError: Firebase: Error (auth/invalid-credential)."
      ) {
        console.log("Incorrect email/password");
      }
    });
};

loginSubmit.addEventListener("click", logInFunction);
