function viewComment()
{
	let username = getCookie('username');
	let postId = extractModule(window.location.toString());

    function extractModule(str)
    {
        let leftBound = str.indexOf("?") + 1;
        let rightBound = str.indexOf("&");
		let id = str.substring(leftBound, rightBound);
		return id;
    }
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://us-central1-combined-projects-6cc05.cloudfunctions.net/getcomments');

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
                    if(data[i].id === postId){
						sHTML += "<div class='postBox'>";
						sHTML += "<p class='postTitle'>" + data[i].pTitle+ "</p>";
						sHTML += "<p class='username'>" + data[i].username+ ":</p>";
						sHTML += "<p class='postContent'>" + data[i].pText+ "</p>";
						sHTML += "<p class='username'> Tagged: " + data[i].pTag+ "<span class='tab'></span>";
						sHTML += "Likes: " + data[i].likes+ "</p>";
						if(data[i].username === username){
							sHTML += "<button class='postButton' onclick=deleteComment(" + "'" + data[i].id + "'" + ")>Delete Post</button>";
						}
						sHTML += "<button class='postButton' onclick=getLikes2(" + "'" + data[i].id + "'" + ")>Like Post</button><br></div>";
						
                }}
				sHTML+= "<label for='postTitle'>Comment</label>";
				sHTML+= "<input class='form-control' type='text' id='commentText' name='commmentText'  value = ''><br>";
				sHTML += "<button class='postButton' id='myButton' type='button' onClick='postSubComments();'>Submit</button><br><br>";
				
				document.getElementById("posts").innerHTML = sHTML;
				getSubComments();
            } else {
                console.log('Error: ' + xhr.status);
            }
        }
    }
    xhr.send(null);
	
}