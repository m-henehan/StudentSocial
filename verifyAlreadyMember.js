// GET comments
//checks whether a user is already subscribed to the module they entered in the search bar. If they aren't they will be added to it, else they won't
function verifyAlreadyMember() {
    let xhr = new XMLHttpRequest();
    if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
        xhr.open('POST', 'http://localhost:5001/webapp0-17967/us-central1/verifyAlreadyMember', true);
    } else {
        xhr.open('POST', 'https://us-central1-webapp0-17967.cloudfunctions.net/verifyAlreadyMember', true);
    }
    xhr.setRequestHeader("Content-type", "application/json");
    //Track the state changes of the request
    xhr.onreadystatechange = function () {
        let modules = []
        alert("verifyAlreadyMember started");
        console.log("started");
        let DONE = 4; //readyState 4 means the request is done
        let OK = 200; // status 200 is a successful return
        let search = document.getElementById("search").value.toUpperCase();
        if (xhr.readyState === DONE) {
            if (xhr.status === OK) {
                let sHTML = "";
                let data = JSON.parse(xhr.responseText);
                console.log("data: " + data);
                for (let i = 0; i < data.length; i++) {
                    console.log(data[i]);
                    modules.push(data[i].code);
                }
                alert("modules: " + modules);
                console.log("modules:" + modules);
                var found = false;
                for (let i = 0; i < modules.length; i++) {
                    alert("m: " + modules[i] + " search: " + search);
                    if (modules[i] === search) {
                        found = true;
                        break;
                    }
                }

                if (!found) {
                    alert("You are joining a new module");
                    addUserForums(document.getElementById("search").value.toUpperCase());
                } else {
                    alert("Already subscribed");
                }
            }
        } else {
            console.log("Ready state: " + xhr.readyState);
            console.log('Error: ' + xhr.status);
        }
    }
    alert("sending docid: " + getCookie('docid'));
    xhr.send(JSON.stringify({"docid": getCookie('docid')}));

}
