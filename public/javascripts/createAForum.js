function showForum(){
	var myString = "";
    
	userinput = document.getElementById("forumType").value;
	
	if (userinput == "Module"){
		myString += "<div class='form-group'>"
		myString += "<label for='modCode'>Module code:</label>";
		myString += "<input class='form-control' id='modCode' name='modCode' type='text' value = ''><br>";
		myString += "<label for='forumTitle'>Forum Title (Please use full title):</label>"
		myString += "<input class='form-control' id='forumTitle' name='forumTitle' type='text' value = ''><br>";
		myString += "<button id='myButton' type='button' onClick='postForum();postUserForums();'>Submit</button></div>";
		document.getElementById('textInputs').innerHTML = myString;
	}
	if (userinput == "Club/Society"){
		myString += "<div class='form-group'>"
		myString += "<input type='hidden' class='form-control' id='modCode' name='modCode' type='text' value = 'null'>";
		myString += "<label for='forumTitle'>Forum Title (Please use full title):</label>"
		myString += "<input class='form-control' id='forumTitle' name='forumTitle' type='text' value = ''><br>";
		myString += "<button id='myButton' type='button' onClick='postForum();postUserForums();'>Submit</button></div>";
		document.getElementById('textInputs').innerHTML = myString;
	}
}