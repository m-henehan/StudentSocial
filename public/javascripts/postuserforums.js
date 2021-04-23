// POST comments
function postUserForums() {
	let userId = extractModule(window.location.toString());

    function extractModule(str)
    {
        let leftBound = str.indexOf("?") + 1;
        let rightBound = str.indexOf("&");
        let id = str.substring(leftBound, rightBound);
		return id;
    }
	
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://us-central1-combined-projects-6cc05.cloudfunctions.net/postuserforums'+ "?id=" + userId);

    xhr.setRequestHeader("Content-type", "application/json");
    // Track the state changes of the request.
    xhr.onreadystatechange = function () {
        var DONE = 4; // readyState 4 means the request is done.
        var OK = 200; // status 200 is a successful return.
        if (xhr.readyState === DONE) {
            if (xhr.status === OK) {
                
            } else {
                console.log('Error: ' + xhr.status); // An error occurred during the request.
            }
        }
    };
  
    xhr.send(JSON.stringify(
	{"forumTitle": document.getElementById('forumTitle').value,}
));
}