function loadPostPage(){
	getTitle();
	getCreatePost();
	getSubscription();
	getFilterTags(); 
	getcomments();
}

function getTitle(){
	var myString = "";
	
	myString += extractModule(window.location.toString());
	
	pageTitle.innerHTML = myString;
	
}

function getCreatePost(){
	let modName = extractModule(window.location.toString());

	let forumUrl = modName.replace(/ /g, "%20");
	let url2 = "location.href="+"'"+"./chatPage.html"+"?" +forumUrl+ "&"+"'";
	let sHTML = "<br><button class='postButton' onclick="+url2+" id="+modName+">Create a Post</button><br>";
	createPostButton.innerHTML = sHTML;
}

function extractModule(str)
    {
        let leftBound = str.indexOf("?") + 1;
        let rightBound = str.indexOf("&");
		let fname = str.substring(leftBound, rightBound);
        fname = fname.replace(/%20/g, " ");
		return fname;
    }