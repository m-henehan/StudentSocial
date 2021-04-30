const functions = require("firebase-functions");
const admin = require('firebase-admin');
const cors = require('cors')({origin: "*"});
admin.initializeApp();

exports.getcomments = functions.https.onRequest((request, response) =>
{

    //connect to our Firestore database
    cors(request, response, () => {
        let myData = []
        admin.firestore().collection("posts").orderBy("timestamp", "desc").get().then((snapshot) => {
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

        admin.firestore().collection("posts").add(request.body).then(() =>{
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
           /** if(snapshot.empty) {
                console.log('No matching documents.');
                response.send('No data in database');
                return;
            }*/

            snapshot.forEach(doc => {
                let docObj = {};
				docObj.id = doc.id;
				myData.push(Object.assign(docObj, doc.data()));

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

exports.postuserforums2 = functions.https.onRequest((request, response) =>
{
    console.log("Request body", request.body);
    cors(request, response, () => {
        admin.firestore().collection("users").doc(request.body.docid).collection("userForums").add(request.body).then(() =>{
            response.send("Saved in the database");
        });
    });
})

exports.deletecomment = functions.https.onRequest((request, response) => {
	cors(request, response, () => {
	// your function body here - use the provided req and res from cors
	admin.firestore().collection("posts").doc(request.query.id).delete().then(function()
	{
		response.send("Document successfully deleted!");
	})
	});
});

exports.deleteforum = functions.https.onRequest((request, response) => {
	let id_filter = []
	id_filter = (request.query.id).split(',');
	let forumId = id_filter[0];
	let docId = id_filter[1];
	cors(request, response, () => {
	// your function body here - use the provided req and res from cors
	admin.firestore().collection("users").doc(docId).collection("userForums").doc(forumId).delete().then(function()
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
        admin.firestore().collection("posts").get().then((snapshot) => {
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
        admin.firestore().collection("posts").doc(request.query.id).update(request.body).then(function()
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
        admin.firestore().collection("comments").orderBy("timestamp").get().then((snapshot) => {
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

exports.authorizedendpoint = functions.https.onRequest((request, response) => {
    cors(request, response, () => {

        console.log('Check if request is authorized with Firebase ID token');
        if ((!request.headers.authorization || !request.headers.authorization.startsWith('Bearer '))) {
            console.error('No Firebase ID token was passed as a Bearer token in the Authorization header.',
                'Make sure you authorize your request by providing the following HTTP header:',
                'Authorization: Bearer <Firebase ID Token>');
            response.status(403).send('Unauthorized');
            return;
        }
        let idToken;
        if (request.headers.authorization && request.headers.authorization.startsWith('Bearer ')) {
            console.log('Found "Authorization" header');
            // Read the ID Token from the Authorization header.
            idToken = request.headers.authorization.split('Bearer ')[1];
        } else {
            // No cookie
            response.status(403).send('Unauthorized');
            return;
        }
        try {
            admin.auth().verifyIdToken(idToken).then((token) => {
                console.log('ID Token correctly decoded', token);
                // Use token.uid to get documents belonging to a user
                let myComments = [];
                admin.firestore().collection('comments').where('uid', '==', token.uid).get().then((snapshot) => {

                    if (snapshot.empty) {
                        console.log('No matching documents.');
                        response.send('No data ');
                        return;
                    }

                    snapshot.forEach(doc => {
                        let docObj = {};
                        docObj.id = doc.id;
                        myComments.push(Object.assign(docObj, doc.data()));
                    });

                    // 2. Send data back to client
                    response.send(myComments);
                })
            });
        } catch (error) {
            console.error('Error while verifying Firebase ID token:', error);
            response.status(403).send('Unauthorized');
            return;
        }
});
});

exports.createUserObj = functions.https.onRequest((request, response) =>
{
    console.log("createUserObj called");
    console.log("Request body", request.body);
    console.log("request.email: ", request.body.email);
    console.log("request.password: ", request.body.password);
    cors(request, response, () => {
        //const currentTime = admin.firestore.Timestamp.now();
        //request.body.timestamp = currentTime;

        return admin.firestore().collection("users").add(request.body).then((snapshot) =>{
            console.log("saved in database");
            console.log(snapshot.id);
            // console.log(snapshot.DocumentReference.toString());
            // console.log("sending document reference id: ");
            //console.log(DocumentReference[id]);
            response.send(JSON.stringify(snapshot.id));
        });
    });
});

exports.verifyAlreadyMember = functions.https.onRequest((request, response) =>
{

    //connect to our Firestore database
    cors(request, response, () => {
        let myData = []
        console.log("request body: "+request.body);
        console.log("request docid: "+request.body.docid);
        return admin.firestore().collection("users").doc(request.body.docid).collection("userForums").get().then((snapshot) => {
            /* if(snapshot.empty) {
                console.log('No matching documents.');
                response.send({'message':'No data in database'});
                return;
            }*/

            snapshot.forEach(doc => {
                myData.push(doc.data());
            })
            response.send(myData);
        });
    })
})

exports.getAllForums = functions.https.onRequest((request, response) =>
{

//connect to our Firestore database
    cors(request, response, () => {
        let myData = []
        console.log("request: "+request.body.toString());
        admin.firestore().collection("forums").get().then((snapshot) => {
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
            console.log("myData: "+myData[0].code);
            response.send(myData);
        });
    })
})

exports.addUserForums = functions.https.onRequest((request, response) =>
{
    console.log("addUserForums entered");
    console.log("Request body", request.body);
    console.log("query id: "+request.body.docid);
    cors(request, response, () => {
        admin.firestore().collection("users").doc(request.body.docid).collection("userForums").add(request.body).then(() =>{
            response.send("Saved in the database");
        });
    });
})

exports.checkusernames = functions.https.onRequest((request, response) =>
{

//connect to our Firestore database
    cors(request, response, () => {
        let myData = []
        console.log("request: "+request.body.toString());
        admin.firestore().collection("users").get().then((snapshot) => {
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
            console.log("myData: "+myData[0].code);
            response.send(myData);
        });
    })
})

exports.utils = functions.https.onRequest((request, response) =>
{

    //connect to our Firestore database
    cors(request, response, () => {
        let myData = []
        return admin.firestore().collection("users").doc(request.body.docid).collection("userForums").get().then((snapshot) => {
            /* if(snapshot.empty) {
                console.log('No matching documents.');
                response.send({'message':'No data in database'});
                return;
            }*/
            console.log("utils executing");
            snapshot.forEach(doc => {
                myData.push(doc.data());
            })
            console.log("myData: " + myData);
            response.send(myData);
        });
    })
})