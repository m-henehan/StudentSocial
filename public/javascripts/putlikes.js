function putLikes(id, likes) {
	likes += 1;
	var xhr = new XMLHttpRequest();
	
	var url = "https://us-central1-combined-projects-6cc05.cloudfunctions.net/putlikes"+ "?id=" + id;
	
	xhr.open('PUT', url);
	
	 xhr.setRequestHeader("Content-type", "application/json");
    // Track the state changes of the request.
    xhr.onreadystatechange = function () {
        var DONE = 4; // readyState 4 means the request is done.
        var OK = 200; // status 200 is a successful return.
        if (xhr.readyState === DONE) {
            if (xhr.status === OK) {
				console.log(xhr.responseText);
                getcomments();
            } else {
                console.log('Error: ' + xhr.status); // An error occurred during the request.
            }
        }
    };
  
    xhr.send(JSON.stringify({"likes": likes}
));
}