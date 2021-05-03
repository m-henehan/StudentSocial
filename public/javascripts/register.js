function register()
{
    let email = document.getElementById("regEmail").value
    let password = document.getElementById("regPassword1").value
    let password2 = document.getElementById("regPassword2").value

    if(email.includes("@nuigalway.ie") && password===password2){
        firebase.default.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                document.cookie = "accessToken=" + user.za;
                document.cookie = "uid=" + user.uid;
                console.log("User object", user);
                createUserObj();
                // ...
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorMessage, errorCode);
            });
    }

    else{
        alert("Invalid email address or password entered.");
    }
}