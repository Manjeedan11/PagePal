import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
    import { getDatabase, set, ref, child } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
    import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
   
    const firebaseConfig = {
        apiKey: "AIzaSyAqWfJzCm4d73nXdpGmqvoeTuh7A15HyQg",
        authDomain: "registration-2a892.firebaseapp.com",
        databaseURL: "https://registration-2a892-default-rtdb.firebaseio.com",
        projectId: "registration-2a892",
        storageBucket: "registration-2a892.appspot.com",
        messagingSenderId: "375186646793",
        appId: "1:375186646793:web:0951493e2067f44e7d95d8"
    };
  
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getDatabase();
    const auth = getAuth(app);
    const dbref = ref(db);

    let email = document.getElementById('logemail');
    let password = document.getElementById('logpassword');

    let SignInUser = evt => {
        evt.preventDefault();
        signInWithEmailAndPassword(auth, email.value, password.value)
        .then((credentials) => {
            console.log(credentials)
            showSuccessModal(successLoginModal); 
            window.location.href = "http://127.0.0.1:5502/home.html";
        })
        .catch((error) => {
            alert(error.message);
            console.log(error.code)
            console.log(error.message)            
        })
    }
     
    loginForm.addEventListener('submit', SignInUser);

    var successLoginModal = document.getElementById('successLoginModal');

    function showSuccessModal(modal) {
        modal.style.display = "block";
        setTimeout(function() {
          modal.style.display = "none";
        }, 4000); // 4 seconds
      }