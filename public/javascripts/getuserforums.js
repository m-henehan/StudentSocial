function getUserForums()
{
   let id = getCookie('docid');
   
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://us-central1-combined-projects-6cc05.cloudfunctions.net/getuserforums' + "?id=" + id);

    //Track the state changes of the request
    xhr.onreadystatechange = function()
    {
        console.log("started");
        var DONE = 4; //readyState 4 means the request is done
        var OK = 200; // status 200 is a successful return
        if (xhr.readyState === DONE) {
            if (xhr.status === OK) {
                var sHTML = "";
				var url = "";
				var fTitle ="";
				if(JSON.parse(xhr.responseText) === null){
					sHTML += "You are not subscribed to any forums, try searching for one!";
				}
				else{
					var data = JSON.parse(xhr.responseText);
					for (var i = 0; i < data.length; i++) {
						fTitle = data[i].forumTitle
						fTitle = fTitle.replace(/ /g, "%20");
							url = "location.href="+"'"+"./postPage.html"+"?" +fTitle+ "&"+"'";
							sHTML += "<button onclick="+url+" id="+data[i].forumTitle+">" + data[i].forumTitle+ "</button>";
							
					}
				}
				var url2 = "location.href="+"'"+"./createAForum.html"+"?" +id+ "&"+"'";
			sHTML += "<button onclick="+url2+">Create a Forum</button>";
			insertButtonsHere.innerHTML = sHTML;
            } else {
                console.log('Error: ' + xhr.status);
            }
        }
    }
    xhr.send(null);
}

