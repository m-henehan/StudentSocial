// GET comments
function getForums()
{
var searchValue = document.getElementById('search').value;
searchValue = searchValue.toLowerCase();
var resultFound = false;

var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://us-central1-emma-s-code.cloudfunctions.net/getforumtype');

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
				var forumT = (data[i].forumTitle).toLowerCase();
				var moduleC = (data[i].moduleCode).toLowerCase();
				if(forumT === searchValue || moduleC === searchValue){
					resultFound = true;
					var fTitle = data[i].forumTitle
					fTitle = fTitle.replace(/ /g, "%20");
					url = "location.href="+"'"+"./postPage.html"+"?" +fTitle+ "&"+"'";
					sHTML += "<button onclick="+url+" id="+data[i].forumTitle+">" + data[i].forumTitle+ "</button>";
			}
			}
			if(resultFound == false){
				sHTML += "No result found";
			}
			insertButtonsHere.innerHTML = sHTML;
        } else {
            console.log('Error: ' + xhr.status); // An error occurred during the request.
        }}};
// Send the request to https://us-central1-my-cool-web-app-37271.cloudfunctions.net/getcomments
xhr.send(null);
}