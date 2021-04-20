function addUserForums(forum){
    alert("addUserForums called");
    let xhr = new XMLHttpRequest();
    if(location.hostname === "localhost" || location.hostname === "127.0.0.1"){
        xhr.open('POST', 'http://localhost:5001/webapp0-17967/us-central1/addUserForums', true);
    }
    else {
        xhr.open('POST', 'https://us-central1-webapp0-17967.cloudfunctions.net/addUserForums', true);
    }

    alert("forum: "+forum);
    xhr.setRequestHeader("Content-type", "application/json");
    //Track the state changes of the request
    xhr.onreadystatechange = function()
    {
        let DONE = 4; //readyState 4 means the request is done
        let OK = 200; // status 200 is a successful return
        if (xhr.readyState === DONE) {
            if (xhr.status === OK) {
                alert("addUserForums started succesfully");
            } else {
                console.log('Error: ' + xhr.status);
            }
        }
    };
    alert("sending forum: " + forum);
    xhr.send(JSON.stringify({"forum": forum, "uid": "12345", "docid": getCookie('docid')}));
}
