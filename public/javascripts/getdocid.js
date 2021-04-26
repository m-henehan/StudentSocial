function getDocId()
{
	alert("in getDocId");
	let userId = getCookie('uid');
	alert("userId: "+userId);
	
	function ReadCookie(){
    var key, value, i;
    var cookieArray  = document.cookie.split('; ');

    for (i = 0; i < cookieArray.length; i++){
        key = cookieArray[i].substr(0, cookieArray[i].indexOf("="));
        value = cookieArray[i].substr(cookieArray[i].indexOf("=")+1);

        if (key == 'uid'){
            return value;
        }
    }
}
	
var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://us-central1-combined-projects-6cc05.cloudfunctions.net/getusers');

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
				if(userId === data[i].uid){
					alert("running getUserForms");
					let s = "";
					s += "docid="+data[i].id+'; ';
					 document.cookie = s;
					 alert(document.cookie);
				}
			}
        } else {
            console.log('Error: ' + xhr.status); // An error occurred during the request.
        }}};
// Send the request to https://us-central1-my-cool-web-app-37271.cloudfunctions.net/getcomments
xhr.send(null);
}