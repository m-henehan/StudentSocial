function getSubscription()
{
   let userid = getCookie('docid');
   let modName = extractModule(window.location.toString());
   alert("modName: " +modName);

    function extractModule(str)
    {
        let leftBound = str.indexOf("?") + 1;
        let rightBound = str.indexOf("&");
        let fname = str.substring(leftBound, rightBound);
		fname = fname.replace(/%20/g, " ");
		return fname;
    }
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://us-central1-combined-projects-6cc05.cloudfunctions.net/getuserforums' + "?id=" + userid);

    //Track the state changes of the request
    xhr.onreadystatechange = function()
    {
        console.log("started");
        var DONE = 4; //readyState 4 means the request is done
        var OK = 200; // status 200 is a successful return
        if (xhr.readyState === DONE) {
            if (xhr.status === OK) {
                var sHTML = "";
				var dataId;
				let forumFound = false;
				var data = JSON.parse(xhr.responseText);
				for (var i = 0; i < data.length; i++) {
					if(modName === data[i].forumTitle){
						alert("match found");
						forumFound = true;
						alert(data[i].id);
						let buttonLink = "deleteForum(" + "'" + data[i].id + "'" + ")";
						sHTML += "<button onclick="+buttonLink+">Unsubscribe</button>";
					}
				}
				if(forumFound === false){
					sHTML += "<button onclick='getForumType2()'>Subscribe</button>";
				}
				subscription.innerHTML = sHTML;
            } else {
                console.log('Error: ' + xhr.status);
            }
        }
    }
    xhr.send(null);
}