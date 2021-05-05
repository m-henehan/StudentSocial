function postcomments(){
    let modName = extractModule(window.location.toString());
	let likes = 0;
	
	let username = getCookie('username');
	
    function extractModule(str)
    {
        let leftBound = str.indexOf("?") + 1;
        let rightBound = str.indexOf("&");
        let fname = str.substring(leftBound, rightBound);
		fname = fname.replace(/%20/g, " ");
		return fname;
    }

    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://us-central1-combined-projects-6cc05.cloudfunctions.net/postcomments', true);

    xhr.setRequestHeader("Content-type", "application/json");
    //Track the state changes of the request
    xhr.onreadystatechange = function()
    {
        let DONE = 4; //readyState 4 means the request is done
        let OK = 200; // status 200 is a successful return
        if (xhr.readyState === DONE) {
            if (xhr.status === OK) {
                location.href ="./postPage.html"+"?" +modName+ "&";
            } else {
                console.log('Error: ' + xhr.status);
            }
        }
    };
    xhr.send(JSON.stringify({"pTag": document.getElementById('postTag').value, "pTitle": document.getElementById('postTitle').value, 
	"pText": document.getElementById('postText').value, "module": modName, "likes": likes, "username": username}
    ));
}