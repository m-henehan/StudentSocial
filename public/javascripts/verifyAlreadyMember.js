// GET comments
//checks whether a user is already subscribed to the module they entered in the search bar. If they aren't they will be added to it, else they won't
function verifyAlreadyMember() {
    let xhr = new XMLHttpRequest();
    
        xhr.open('POST', 'https://us-central1-combined-projects-6cc05.cloudfunctions.net/verifyAlreadyMember', true);
    
    xhr.setRequestHeader("Content-type", "application/json");
    //Track the state changes of the request
    xhr.onreadystatechange = function () {
        let modules = []
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
                    addUserForums(document.getElementById("search").value.toUpperCase());
                } else {
                }
            }
        } else {
            console.log("Ready state: " + xhr.readyState);
            console.log('Error: ' + xhr.status);
        }
    }
    xhr.send(JSON.stringify({"docid": getCookie('docid')}));

}