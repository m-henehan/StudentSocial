// POST comments
function postForum() {
	
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://us-central1-emma-s-code.cloudfunctions.net/postforum');

    xhr.setRequestHeader("Content-type", "application/json");
    // Track the state changes of the request.
    xhr.onreadystatechange = function () {
        var DONE = 4; // readyState 4 means the request is done.
        var OK = 200; // status 200 is a successful return.
        if (xhr.readyState === DONE) {
            if (xhr.status === OK) {
                let fname = document.getElementById('forumTitle').value
				fname = fname.replace(/ /g, "%20");
				location.href ="./postPage.html"+"?" +fname+ "&";
            } else {
                console.log('Error: ' + xhr.status); // An error occurred during the request.
            }
        }
    };
  
    xhr.send(JSON.stringify(
	{"forumType": document.getElementById('forumType').value, "moduleCode": document.getElementById('modCode').value, "forumTitle": document.getElementById('forumTitle').value,}
));
}