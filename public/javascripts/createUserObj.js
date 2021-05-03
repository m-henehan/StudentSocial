function createUserObj(){
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://us-central1-combined-projects-6cc05.cloudfunctions.net/createUserObj', true);

    xhr.setRequestHeader("Content-type", "application/json");
    //Track the state changes of the request
    xhr.onreadystatechange = function()
    {
        let DONE = 4; //readyState 4 means the request is done
        let OK = 200; // status 200 is a successful return
        if (xhr.readyState === DONE) {
            if (xhr.status === OK) {
                let docId = JSON.parse(xhr.responseText);
                document.cookie = "docid =" + docId;
				let s2 = "";
				s2 = "username="+document.getElementById("regUsername").value+'; ';
				document.cookie = s2;
                window.location.href = "./joinForumSearchbar.html";
            } else {
                console.log('Error: ' + xhr.status);
            }
        }
    };
    // alert("details:  email: "+ email + "password: "+ password+ "uid: "+  uid);
    xhr.send(JSON.stringify({"email":document.getElementById("regEmail").value, "username":document.getElementById("regUsername").value, "uid" : getCookie('uid')}));
}