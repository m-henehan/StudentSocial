function getAllUserForums() {

    let xhr = new XMLHttpRequest();
    alert("xhr created");
    if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
        xhr.open('POST', 'http://localhost:5001/webapp0-17967/us-central1/getAllUserForums', true);
        alert("localhost");
    } else {
        xhr.open('POST', 'https://us-central1-webapp0-17967.cloudfunctions.net/getAllUserForums', true);
        alert("webhost");
    }
    xhr.setRequestHeader("Content-type", "application/json");
    //Track the state changes of the request
    xhr.onreadystatechange = function () {
        let modules = []
        let societies = []
        console.log("started");
        let DONE = 4; //readyState 4 means the request is done
        let OK = 200; // status 200 is a successful return
        if (xhr.readyState === DONE) {
            if (xhr.status === OK) {
                let sHTML = "";
                let data = JSON.parse(xhr.responseText);
                console.log("data: " + data);
                for (let i = 0; i < data.length; i++) {
                    if(data[i].type ==="module") {
                        console.log(data[i]);
                        modules.push(data[i].name);
                    }
                    else{
                        societies.push(data[i].name);
                    }
                }
                }
                for (let i = 0; i < modules.length; i++) {
                    let optn = modules[i];
                    let el = document.createElement("button");
                    el.textContent = optn;
                    el.className = "listButtona";
                    document.getElementById("modules").appendChild(el);
                    let br = document.createElement('br');
                    document.getElementById("modules").appendChild(br);
                }
                for (let i = 0; i < societies.length; i++) {
                    let optn = societies[i];
                    let el = document.createElement("button");
                    el.textContent = optn;
                    el.className = "listButtonb";
                    document.getElementById("societies").appendChild(el);
                    let br = document.createElement('br');
                    document.getElementById("societies").appendChild(br);
            }

        } else {
            console.log("Ready state: " + xhr.readyState);
            console.log('Error: ' + xhr.status);
        }
    }
    alert("sending docid: " + getCookie('docid'));
    xhr.send(JSON.stringify({"docid": getCookie('docid')}));

}
