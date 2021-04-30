function showForum(){
    var myString = "";

    userinput = document.getElementById("forumType").value;

    if (userinput === "Module"){
        myString += "<br>"
        myString += "<div class='form-group'>"
        myString += "<h3><label for='modCode'>Module code:</label></h3>";
        myString += "<input class='searchBar' id='modCode' name='modCode' type='text' value = ''><br></div>";
        myString += "<h3><label for='forumTitle'>Forum Title (Please use full title):</label></h3>"
        myString += "<input class='searchBar' id='forumTitle' name='forumTitle' type='text' value = ''><br>";
        myString += "<br>";
        myString += "<button id='myButton' class='subButton' type='button' onClick='postForum();postUserForums();'>Submit</button></div>";
        document.getElementById('textInputs').innerHTML = myString;
    }
    if (userinput === "Club/Society"){
        myString += "<br>";
        myString += "<div class='form-group'>"
        myString += "<input type='hidden' class='form-control' id='modCode' name='modCode' type='text' value = 'null'>";
        myString += "<h3><label for='forumTitle'>Forum Title (Please use full title):</label></h3>"
        myString += "<input class='searchBar' id='forumTitle' name='forumTitle' type='text' value = ''><br>";
        myString += "<br>";
        myString += "<button id='myButton' class='subButton' type='button' onClick='postForum();postUserForums();'>Submit</button></div>";
        document.getElementById('textInputs').innerHTML = myString;
    }
}