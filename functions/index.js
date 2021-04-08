const functions = require("firebase-functions");
const admin = require('firebase-admin');
const cors = require('cors')({origin: "*"});
admin.initializeApp();

exports.getcomments = functions.https.onRequest((request, response) =>
{

    //connect to our Firestore database
    cors(request, response, () => {
        let myData = []
        admin.firestore().collection("testCollect").get().then((snapshot) => {
            if(snapshot.empty) {
                console.log('No matching documents.');
                response.send('No data in database');
                return;
            }

            snapshot.forEach(doc => {
                let docObj = {};
				docObj.id = doc.id;
				myData.push(Object.assign(docObj, doc.data()));

            })
            response.send(myData);
        });
    })
})


exports.postcomments = functions.https.onRequest((request, response) =>
{
    console.log("Request body", request.body);
    cors(request, response, () => {
		// Create a timestamp to add to the comment document
		const currentTime = admin.firestore.Timestamp.now();
		request.body.timestamp = currentTime;

        admin.firestore().collection("testCollect").add(request.body).then(() =>{
            response.send("Saved in the database");
        });
    });
})

exports.postforum = functions.https.onRequest((request, response) =>
{
    console.log("Request body", request.body);
    cors(request, response, () => {
        admin.firestore().collection("forums").add(request.body).then(() =>{
            response.send("Saved in the database");
        });
    });
})

exports.getuserforums = functions.https.onRequest((request, response) =>
{

    //connect to our Firestore database
    cors(request, response, () => {
        let myData = []
        return admin.firestore().collection("users").doc(request.query.id).collection("userForums").get().then((snapshot) => {
            if(snapshot.empty) {
                console.log('No matching documents.');
                response.send('No data in database');
                return;
            }

            snapshot.forEach(doc => {
                myData.push(doc.data());
            })
            response.send(myData);
        });
    })
})

exports.getusers = functions.https.onRequest((request, response) =>
{

    //connect to our Firestore database
    cors(request, response, () => {
        let myData = []
        return admin.firestore().collection("users").get().then((snapshot) => {
            if(snapshot.empty) {
                console.log('No matching documents.');
                response.send('No data in database');
                return;
            }

            snapshot.forEach(doc => {
                let docObj = {};
				docObj.id = doc.id;
				myData.push(Object.assign(docObj, doc.data()));
            })
            response.send(myData);
        });
    })
})

exports.getforumtype = functions.https.onRequest((request, response) =>
{

    //connect to our Firestore database
    cors(request, response, () => {
        let myData = []
        return admin.firestore().collection("forums").get().then((snapshot) => {
            if(snapshot.empty) {
                console.log('No matching documents.');
                response.send('No data in database');
                return;
            }

            snapshot.forEach(doc => {
                myData.push(doc.data());
            })
            response.send(myData);
        });
    })
})

exports.postuserforums = functions.https.onRequest((request, response) =>
{
    console.log("Request body", request.body);
    cors(request, response, () => {
        admin.firestore().collection("users").doc(request.query.id).collection("userForums").add(request.body).then(() =>{
            response.send("Saved in the database");
        });
    });
})

exports.deletecomment = functions.https.onRequest((request, response) => {
	cors(request, response, () => {
	// your function body here - use the provided req and res from cors
	admin.firestore().collection("testCollect").doc(request.query.id).delete().then(function()
	{
		response.send("Document successfully deleted!");
	})
	});
});

exports.getlikes = functions.https.onRequest((request, response) =>
{
    //connect to our Firestore database
    cors(request, response, () => {
        let myData = []
        admin.firestore().collection("testCollect").get().then((snapshot) => {
            if(snapshot.empty) {
                console.log('No matching documents.');
                response.send('No data in database');
                return;
            }

            snapshot.forEach(doc => {
                let docObj = {};
				docObj.id = doc.id;
				myData.push(Object.assign(docObj, doc.data()));

            })
            response.send(myData);
        });
    })
})

exports.putlikes = functions.https.onRequest((request, response) =>
{
    cors(request, response, () => {
        admin.firestore().collection("testCollect").doc(request.query.id).update(request.body).then(function()
		{
            response.send("Document successfully updated!");
        })
    });
});

exports.postsubcomments = functions.https.onRequest((request, response) =>
{
    console.log("Request body", request.body);
    cors(request, response, () => {
		// Create a timestamp to add to the comment document
		const currentTime = admin.firestore.Timestamp.now();
		request.body.timestamp = currentTime;

        admin.firestore().collection("comments").add(request.body).then(() =>{
            response.send("Saved in the database");
        });
    });
})

exports.getsubcomments = functions.https.onRequest((request, response) =>
{

    //connect to our Firestore database
    cors(request, response, () => {
        let myData = []
        admin.firestore().collection("comments").get().then((snapshot) => {
            if(snapshot.empty) {
                console.log('No matching documents.');
                response.send('No data in database');
                return;
            }

            snapshot.forEach(doc => {
                let docObj = {};
				docObj.id = doc.id;
				myData.push(Object.assign(docObj, doc.data()));

            })
            response.send(myData);
        });
    })
})