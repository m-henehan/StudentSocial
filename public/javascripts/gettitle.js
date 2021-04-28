function getTitle(){
	var myString = "";
	
	myString += extractModule(window.location.toString());
	
	pageTitle.innerHTML = myString;

    function extractModule(str)
    {
        let leftBound = str.indexOf("?") + 1;
        let rightBound = str.indexOf("&");
		let fname = str.substring(leftBound, rightBound);
        fname = fname.replace(/%20/g, " ");
		return fname;
    }
	
}