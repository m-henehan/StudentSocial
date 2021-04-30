function logout()
{
firebase.auth().signOut().then(() => {
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
});

window.location.href = "./index.html"
}
