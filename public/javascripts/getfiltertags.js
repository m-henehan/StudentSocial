function getFilterTags()
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
                        showTags(data[i].forumType);
                }}
            } else {
                console.log('Error: ' + xhr.status);
            }
        }
    }
    xhr.send(null);
	
	function showTags(fType){
	var myString = "";
    
	myString += "<label for='postTag' class='subtitle'>Filter posts by tags:</label>";
	myString += "<br>";
	myString += "<select class='dropdown1' id='postTag' name='postTag'  onchange ='getFilteredPosts(this)'>";
	myString += "<option value='-1'>--</option>";
	userinput = document.getElementById("forumType").value;
	if (fType == "Module"){
		myString += "<option value='Assignment'>Assignment</option>";
		myString += "<option value='Exam'>Exam</option>";
		myString += "<option value='General Discussion'>General Discussion</option>";
		myString += "</select><button class='postButton' onclick=getcomments()>Undo Filter</button><br>";
		document.getElementById('postTags').innerHTML = myString;
	}
	if (fType == "Club/Society"){
		myString += "<option value='Meeting'>Meeting</option>";
		myString += "<option value='Training'>Training</option>";
		myString += "<option value='Match'>Match</option>";
		myString += "<option value='General Discussion'>Gerneral Discussion</option>";
		myString += "</select><button class='postButton' onclick=getcomments()>Undo Filter</button><br>";
		document.getElementById('postTags').innerHTML = myString;
	}
}
}