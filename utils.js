function utils() {

    let xhr = new XMLHttpRequest();
    alert("xhr created");
    if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
        xhr.open('POST', '/utils', true);
        alert("localhost");
    } else {
        xhr.open('POST', '/utils', true);
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
                    if(data[i].forumType ==="Module") {
                        console.log(data[i]);
                        modules.push(data[i].forumTitle);
                    }
                    else if(data[i].forumType === "Society"){
                        societies.push(data[i].forumTitle);
                    }
                }
                console.log("modules: "+modules);
                console.log("societies: "+societies);
                }
            let sHTML = "";
                for (let i = 0; i < modules.length; i++) {
                    let optn = modules[i];
                    let fTitle = optn.replace(/ /g, "%20");
                    let url = "location.href="+"'"+"./postPage.html"+"?" +fTitle+ "&"+"'";
                    sHTML += "<button class='listButtona' onclick="+url+" id="+optn+">" + optn + "<br>";
                }
                insertModules.innerHTML = sHTML;
                let tHTML = "";
                for (let i = 0; i < societies.length; i++) {
                    let optn = societies[i];
                    let tTitle = optn.replace(/ /g, "%20");
                    let url = "location.href="+"'"+"./postPage.html"+"?" +tTitle+ "&"+"'";
                    tHTML += "<button class='listButtonb' onclick="+url+" id="+optn+">" + optn + "<br>";
            }
            insertSocieties.innerHTML = tHTML;
        } else {
            console.log("Ready state: " + xhr.readyState);
            console.log('Error: ' + xhr.status);
        }
    }
    alert("sending docid: " + getCookie('docid'));
    xhr.send(JSON.stringify({"docid": getCookie('docid')}));

}

function chooseNewForum(){
    location.assign("./firstform.html");
}
