function createForum(){
    let xhr = new XMLHttpRequest();
    alert("xhr created");
    if(location.hostname === "localhost" || location.hostname === "127.0.0.1"){
        alert("localhost");
        xhr.open('POST', 'http://localhost:5001/webapp0-17967/us-central1/createForum', true);
    }
    else {
        xhr.open('POST', 'https://us-central1-webapp0-17967.cloudfunctions.net/createForum', true);
        alert("webhost");
    }


    xhr.setRequestHeader("Content-type", "application/json");
    //Track the state changes of the request
    xhr.onreadystatechange = function()
    {
        let DONE = 4; //readyState 4 means the request is done
        let OK = 200; // status 200 is a successful return
        if (xhr.readyState === DONE) {
            if (xhr.status === OK) {
                alert("forum successfully created");
                console.log("forum successfully created");
                addUserForums(document.getElementById("code").value);
            } else {
                alert('Error: ' + xhr.status);
                console.log('Error: ' + xhr.status);
            }
        }
    };
    // alert("details:  email: "+ email + "password: "+ password+ "uid: "+  uid);
    xhr.send(JSON.stringify({"name":document.getElementById("name").value, "code":document.getElementById("code").value}));

}
