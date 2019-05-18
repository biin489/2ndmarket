var firebaseConfig = {
    apiKey: "AIzaSyBfgBCcHaoo5kjt2Myvu8E9vArQ7gs-SKg",
    authDomain: "demodoan1.firebaseapp.com",
    databaseURL: "https://demodoan1.firebaseio.com",
    projectId: "demodoan1",
    storageBucket: "demodoan1.appspot.com",
    messagingSenderId: "585840118644",
    appId: "1:585840118644:web:fe4063bcae520273"
};
firebase.initializeApp(firebaseConfig);

$(document).ready(function(){
    $('#btnLogin').on('click', function(e){
        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword($('#exampleInputEmail').val(), $('#exampleInputPassword').val())
        .then(function(user){
            if(user){
                window.location.href = "index.html"
            }
        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
                alert('Wrong password.');
            } else {
                alert(errorMessage);
            }
        });
    })
})