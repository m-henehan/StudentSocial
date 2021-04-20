const functions = require("firebase-functions");
const admin = require('firebase-admin');
const cors = require('cors')({origin: "*"});
admin.initializeApp();


//gets all posts belonging to a certain forum
exports.getcomments = functions.https.onRequest((request, response) =>
{

//connect to our Firestore database
    cors(request, response, () => {
        let myData = []
        admin.firestore().collection("posts").orderBy("timestamp").get().then((snapshot) => {
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
        const currentTime = admin.firestore.Timestamp.now();
        request.body.timestamp = currentTime;

        return admin.firestore().collection("posts").add(request.body).then((snapshot) =>{
            response.send("Saved in the database");
        });
    });
})


exports.deletecomment = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        // your function body here - use the provided req and res from cors
        admin.firestore().collection("comments").doc(getCookie('docid')).delete().then(function() 	{
            response.send("Document successfully deleted!");
        })
    });
});

//gets the names of all forums a user is signed up to
exports.getforums = functions.https.onRequest((request, response) => {
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
            const decodedIdToken = admin.auth().verifyIdToken(idToken).then((token) => {
                console.log('ID Token correctly decoded', token);
                let myComments = [];
                admin.firestore().collection('users').where('uid', '==', token.uid).get().then((snapshot) => {

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
                });

            });
        } catch (error) {
            console.error('Error while verifying Firebase ID token:', error);
            response.status(403).send('Unauthorized');
            return;
        }
    });
});


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

        return admin.firestore().collection("students").add(request.body).then((snapshot) =>{
            console.log("saved in database");
            console.log(snapshot.id);
            // console.log(snapshot.DocumentReference.toString());
            // console.log("sending document reference id: ");
            //console.log(DocumentReference[id]);
            response.send(JSON.stringify(snapshot.id));
        });
    });
});

exports.createForum = functions.https.onRequest((request, response) =>
{
    console.log("createForum called");
    console.log("Request body", request.body);
    cors(request, response, () => {
        //const currentTime = admin.firestore.Timestamp.now();
        //request.body.timestamp = currentTime;

        return admin.firestore().collection("modules").add(request.body).then((snapshot) =>{
            console.log("saved in database");
            response.send("Saved in the database");
        });
    });
});

exports.getAllForums = functions.https.onRequest((request, response) =>
{

//connect to our Firestore database
    cors(request, response, () => {
        let myData = []
        console.log("request: "+request.body.toString());
        admin.firestore().collection("modules").get().then((snapshot) => {
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

/* exports.getAllForums = functions.https.onRequest((request, response) =>
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
})*/

/******************************************************************************************/

exports.createForum = functions.https.onRequest((request, response) =>
{
    console.log("Request body", request.body);
    cors(request, response, () => {
        admin.firestore().collection("modules").add(request.body).then(() =>{
            response.send("Saved in the database");
        });
    });
})


exports.verifyAlreadyMember = functions.https.onRequest((request, response) =>
{

    //connect to our Firestore database
    cors(request, response, () => {
        let myData = []
        console.log("request body: "+request.body);
        console.log("request docid: "+request.body.docid);
        return admin.firestore().collection("students").doc(request.body.docid).collection("modules").get().then((snapshot) => {
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
/*
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
})*/

exports.addUserForums = functions.https.onRequest((request, response) =>
{
    console.log("addUserForums entered");
    console.log("Request body", request.body);
    console.log("query id: "+request.body.docid);
    cors(request, response, () => {
        admin.firestore().collection("students").doc(request.body.docid).collection("modules").add(request.body).then(() =>{
            response.send("Saved in the database");
        });
    });
})