function deleteForum(id){
	alert("running delete forum");
	alert("forum id:"+id);
	console.log("Deleting comment");
	let docId = getCookie('docid');
	var xhr = new XMLHttpRequest();
	
	var url = "https://us-central1-combined-projects-6cc05.cloudfunctions.net/deleteforum" + "?id=" + id+","+docId;
	
	xhr.open('DELETE', url);
	// Track the state changes of the request.
	xhr.onreadystatechange = function () {
		var DONE = 4; // readyState 4 means the request is done.
		var OK = 200; // status 200 is a successful return.
		if (xhr.readyState === DONE) {
			if (xhr.status === OK) {
				// If comment deleted successfully
				// Call getComments to refresh the page
				console.log(xhr.responseText);
				getSubscription();
			} else {
				console.log('Error: ' + xhr.status); // An error occurred during the request.
			}
		}
	};
	xhr.send(JSON.stringify({"docid": getCookie('docid')}));
}