function checkUsernames() {
    console.log("checkusernames");
	
	let docId = getCookie('docid');
	let username = document.getElementById("regUsername").value;
	
    let xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://us-central1-combined-projects-6cc05.cloudfunctions.net/checkusernames');
    

    //Track the state changes of the request
    xhr.onreadystatechange = function () {
        console.log("checkUsernames started");
        //Alert.render("Looks like you're already subscribed to this module!", "Would you like to subscribe to a different module?" );
        let DONE = 4; //readyState 4 means the request is done
        let OK = 200; // status 200 is a successful return
        let username = document.getElementById("regUsername").value.toUpperCase();
        if (xhr.readyState === DONE){
            if (xhr.status === OK) {
                let usernameList = [];
                let data = JSON.parse(xhr.responseText);
                for (let i = 0; i < data.length; i++) {
					let userUpper = data[i].username.toUpperCase();
                    usernameList.push(userUpper);
                }
                console.log("username:" + usernameList);
                var found = false;
                for (let m = 0; m < usernameList.length; m++) {
                    if (usernameList[m] === username) {
                        found = true;
						alert(usernameList[m]);
						alert("Username already taken. Please enter a different username.");
						break;
                        
                    }
                }
                if (!found) { //if username is unique
                    register();
                }
            }

        } else {
            console.log('Error: ' + xhr.status)
        }
    }
    xhr.send(null);
}