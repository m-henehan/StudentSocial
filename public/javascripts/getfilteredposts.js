function getFilteredPosts(selectObject)
{
	let username = getCookie('username');
    let modName = extractModule(window.location.toString());
	let tag = selectObject.value;

    function extractModule(str)
    {
        let leftBound = str.indexOf("?") + 1;
        let rightBound = str.indexOf("&");
		let fname = str.substring(leftBound, rightBound);
        fname = fname.replace(/%20/g, " ");
		return fname;
    }
	 let sHTML = "";

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
               
                let data = JSON.parse(xhr.responseText);
                for (let i = 0; i < data.length; i++) {
                    if(data[i].module === modName && data[i].pTag === tag){
						sHTML += "<div class='postBox'>";
						sHTML += "<p class='postTitle'>" + data[i].pTitle+ "</p>";
						sHTML += "<p class='username'>" + data[i].username+ ":</p>";
						sHTML += "<p class='postContent'>" + data[i].pText+ "</p>";
						sHTML += "<p class='username'> Tagged: " + data[i].pTag+ "<span class='tab'></span>";
						sHTML += "Likes: " + data[i].likes+ "</p>";
						if(data[i].username === username){
							sHTML += "<button class='postButton' onclick=deleteComment(" + "'" + data[i].id + "'" + ")>Delete Post</button>";
						}
						sHTML += "<button class='postButton' onclick=getLikes(" + "'" + data[i].id + "'" + ")>Like Post</button>";
						let url = "location.href="+"'"+"./commentPage.html"+"?" +data[i].id+ "&"+"'";
						sHTML += "<button class='postButton' onclick="+url+" id="+data[i].id+">Comments</button></div><br><br>";
                }}
				if(tag === '-1'){
					getcomments();
				}
				document.getElementById("posts").innerHTML = sHTML;
            } else {
                console.log('Error: ' + xhr.status);
            }
        }
    }
	
				
    xhr.send(null);
	
	
}