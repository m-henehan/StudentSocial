function getDocId()
{
	let userId = getCookie('uid');
	
	
var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://us-central1-combined-projects-6cc05.cloudfunctions.net/getusers');

// Track the state changes of the request.
xhr.onreadystatechange = function () {
    var DONE = 4; // readyState 4 means the request is done.
    var OK = 200; // status 200 is a successful return.
    if (xhr.readyState === DONE) {
        if (xhr.status === OK) {
			var sHTML = "";
			var data = JSON.parse(xhr.responseText);
			for(var i=0; i<data.length; i++)
			{
				if(userId === data[i].uid){
					let s = "";
					s += "username="+data[i].username+"; ";
					document.cookie = s;
					let s2 = "";
					s2 = "docid="+data[i].id+'; ';
					document.cookie = s2;
					window.location.href = "./userHomePage.html";
				}
			}
        } else {
            console.log('Error: ' + xhr.status); // An error occurred during the request.
        }}};
// Send the request to https://us-central1-my-cool-web-app-37271.cloudfunctions.net/getcomments
xhr.send(null);
}