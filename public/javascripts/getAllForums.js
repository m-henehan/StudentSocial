// GET comments
function getAllForums() {
    console.log("getAllForums entered");
	
	let docId = getCookie('docid');

	
    let xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://us-central1-combined-projects-6cc05.cloudfunctions.net/getAllForums');
    

    //Track the state changes of the request
    xhr.onreadystatechange = function () {
        console.log("getAllForums started");
        //Alert.render("Looks like you're already subscribed to this module!", "Would you like to subscribe to a different module?" );
        let DONE = 4; //readyState 4 means the request is done
        let OK = 200; // status 200 is a successful return
        let search = document.getElementById("search").value.toUpperCase();
        if (xhr.readyState === DONE){
            if (xhr.status === OK) {
                let modList = [];
                let data = JSON.parse(xhr.responseText);
                for (let i = 0; i < data.length; i++) {
                    console.log(data[i]);
                    modList.push(data[i].code);
                }
                console.log("modList:" + modList);
                var found = false;
                for (let m = 0; m < modList.length; m++) {
                    alert("m: " + modList[m] + " search: " + search);
                    if (modList[m] === search) {
                        found = true;
                        break;
                    }
                }
                if (!found) { //if the entered code is not in existing modules
                    // let theAnswer = confirm("Module not found. Are you sure that you have entered the correct module code '" +
                    let theAnswer = confirm("Module not found. Are you sure that you have entered the correct module code '" +
                        document.getElementById("search").value.toUpperCase() + "'?", );

                    //if the user presses the "OK" button display the message "Javascript is cool!!"
                    if (theAnswer) {

                        window.location.href = "./createAForum.html";
                    }
                } else {
                    verifyAlreadyMember();
                }
            }

        } else {
            console.log('Error: ' + xhr.status)
        }
    }

    alert("sending");
    xhr.send(null);
}