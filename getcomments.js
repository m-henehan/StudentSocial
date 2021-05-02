function getcomments()
{
    let username = getCookie('username');
    let modName = extractModule(window.location.toString());

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
    xhr.open('GET', 'https://us-central1-webapp0-17967.cloudfunctions.net/getcomments');

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
                    if(data[i].module === modName){
                        sHTML += "<div id='textBubble' class='postBox'>";
                        sHTML += "<p class='title'> Title: " + data[i].pTitle+ "</p>";
                        sHTML += "<p class='username'> Username: " + data[i].username+ "</p>";
                        sHTML += "<p class='username'> Tag: " + data[i].pTag+ "</p>";
                        sHTML += "<p class='postContent'> Text: " + data[i].pText+ "</p>";
                        sHTML += "<p class='likes'> Likes: " + data[i].likes+ "</p>";
                        if(data[i].username === username){
                            sHTML += "<button onclick=deleteComment(" + "'" + data[i].id + "'" + ") class='postButton'>Delete Post</button>";
                        }
                        sHTML += "<button onclick=getLikes(" + "'" + data[i].id + "'" + ") class='postButton'>Like Post</button><br>";
                        let url = "location.href="+"'"+"./commentPage.html"+"?" +data[i].id+ "&"+"'";
                        sHTML += "<button onclick="+url+" class='postButton' id="+data[i].id+">Comments</button></div><br><br>";
                    }}
                document.getElementById("posts").innerHTML = sHTML;
            } else {
                console.log('Error: ' + xhr.status);
            }
        }
    }


    xhr.send(null);


}