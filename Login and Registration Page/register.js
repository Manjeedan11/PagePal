import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
    import { getDatabase, set, ref } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
    import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
   
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

    let username = document.getElementById('username');
    let email = document.getElementById('email');
    let password = document.getElementById('password');

    let RegisterUser = evt => {
        evt.preventDefault();
        createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((credentials) => {
            set(ref(db, 'users/' + credentials.user.uid), {
                username: username.value,
                email: email.value,
                password: password.value
            });
            showSuccessModal(successSignUpModal); 
            window.location.href = "http://127.0.0.1:5502/Login%20and%20Registration%20Page/index.html";
        })
        .catch((error) => {
            alert(error.message);
            console.log(error.code)
            console.log(error.message)            
        })
    }
     
    signupForm.addEventListener('submit', RegisterUser);

    var successSignUpModal = document.getElementById('successSignUpModal');

    function showSuccessModal(modal) {
        modal.style.display = "block";
        setTimeout(function() {
          modal.style.display = "none";
        }, 4000); // 4 seconds
      }


 

   