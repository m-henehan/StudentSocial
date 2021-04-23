// GET comments
function getForums()
{
var searchValue = document.getElementById('search').value;
searchValue = searchValue.toLowerCase();
var resultFound = false;

var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://us-central1-functions-83b7e.cloudfunctions.net/getforumtype');

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
				//searchbar returns any forums that contain the input search item
				if(forumT.indexOf(searchValue) !== -1 || moduleC.indexOf(searchValue) !== -1){
					resultFound = true;
					var fTitle = data[i].forumTitle
					fTitle = fTitle.replace(/ /g, "%20");
					url = "location.href="+"'"+"./postPage.html"+"?" +fTitle+ "&"+"'";
					sHTML += "<button class='btn btn-block' onclick="+url+" id="+data[i].forumTitle+">" + data[i].forumTitle+ "</button> <br>";
			}
			}
			if(resultFound == false){
				sHTML += "<div id='noResult'>  No result found. Check your spelling for mistakes and try again, or create a forum <a href='https://functions-83b7e.web.app/createAForum.html'>here</a></div>";
			}
			insertButtonsHere.innerHTML = sHTML;
        } else {
            console.log('Error: ' + xhr.status); // An error occurred during the request.
        }}};
// Send the request to https://us-central1-my-cool-web-app-37271.cloudfunctions.net/getcomments
xhr.send(null);
}
