function getcomments()
{
    let modName = extractModule(window.location.toString());

    function extractModule(str)
    {
        let leftBound = str.indexOf("?") + 1;
        let rightBound = str.indexOf("&");
		let fname = str.substring(leftBound, rightBound);
        fname = fname.replace(/%20/g, " ");
		return fname;
    }

    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://us-central1-emma-s-code.cloudfunctions.net/getcomments');

    //Track the state changes of the request
    xhr.onreadystatechange = function()
    {
        console.log("started");
        let DONE = 4; //readyState 4 means the request is done
        let OK = 200; // status 200 is a successful return
        if (xhr.readyState === DONE) {
            if (xhr.status === OK) {
                let sHTML = "";
                let data = JSON.parse(xhr.responseText);
                for (let i = 0; i < data.length; i++) {
                    if(data[i].module === modName){
                        sHTML += "<p> Tag: " + data[i].pTag+ "</p>";
						sHTML += "<p> Title: " + data[i].pTitle+ "</p>";
						sHTML += "<p> Text: " + data[i].pText+ "</p>";
						sHTML += "<p> Likes: " + data[i].likes+ "</p>";
						sHTML += "<button onclick=deleteComment(" + "'" + data[i].id + "'" + ")>Delete Comment</button>";
						sHTML += "<button onclick=getLikes(" + "'" + data[i].id + "'" + ")>Like Comment</button><br>";
                }}
				let forumUrl = modName.replace(/ /g, "%20");
				url = "location.href="+"'"+"./chatPage.html"+"?" +forumUrl+ "&"+"'";
                sHTML += "<button onclick="+url+" id="+modName+">Create a Post</button>";
				document.getElementById("posts").innerHTML = sHTML;
            } else {
                console.log('Error: ' + xhr.status);
            }
        }
    }
    xhr.send(null);
	
}

