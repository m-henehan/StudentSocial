let userModules = ["Calculus", "Programming", "Networks"];

function displayModules()
{
    for(let i=0; i<userModules.length; i++)
    {
        createButton(userModules[i]);
    }
}

function createButton(modName)
{
    let modButton = document.createElement('button');
    modButton.id = modName;
    modButton.innerHTML = modName;
    modButton.onclick = function()
    {
        let urlPage = "./chatPage.html";
        urlPage += "?" + modName + "&";
        location.href = urlPage;
    }
    document.getElementById("insertButtonsHere").appendChild(modButton);
}

function extractModule(str)
{
    let leftBound = str.indexOf("?") + 1;
    let rightBound = str.indexOf("&");
    return str.substring(leftBound, rightBound);
}

function showTags(fType){
	var myString = "";
    
	myString += "<label for='postTag'>Post Tag (select one):</label>";
	myString += "<select class='form-control' id='postTag' name='postTag'>";
	myString += "<option value='-1'>--</option>";
	userinput = document.getElementById("forumType").value;
	if (fType == "Module"){
		myString += "<option value='Assignment'>Assignment</option>";
		myString += "<option value='Exam'>Exam</option>";
		myString += "<option value='General Discussion'>General Discussion</option>";
		myString += "</select><br>";
		document.getElementById('postTags').innerHTML = myString;
	}
	if (fType == "Club/Society"){
		myString += "<option value='Meeting'>Meeting</option>";
		myString += "<option value='Training'>Training</option>";
		myString += "<option value='Match'>Match</option>";
		myString += "<option value='General Discussion'>Gerneral Discussion</option>";
		myString += "</select><br>";
		document.getElementById('postTags').innerHTML = myString;
	}
}