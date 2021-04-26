function getForumType2()
{
    let forumName = extractModule(window.location.toString());

    function extractModule(str)
    {
        let leftBound = str.indexOf("?") + 1;
        let rightBound = str.indexOf("&");
		let fname = str.substring(leftBound, rightBound);
        fname = fname.replace(/%20/g, " ");
		return fname;
    }

    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://us-central1-combined-projects-6cc05.cloudfunctions.net/getforumtype');

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
                    if(data[i].forumTitle === forumName){
                        postUserForums2(data[i].forumType);
                }}
            } else {
                console.log('Error: ' + xhr.status);
            }
        }
    }
    xhr.send(null);
	

}