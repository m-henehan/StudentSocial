function login()
{
    let email = document.getElementById('logEmail').value
    let password = document.getElementById('logPsw').value
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            document.cookie = "accessToken=" + user.za;
            document.cookie = "uid=" + user.uid;
            console.log("User object", user);
            getDocId();
            // ...
        })
        .catch((error) => {
			alert("Invalid email address or password entered.");
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
}