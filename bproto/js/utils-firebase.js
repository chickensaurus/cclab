let database, dbRef, myId;

function setupFirebase(data) {
    setupDB();
    dbRef = getDBRef("TreeData");

    dbRef.push(data)
        .then(function (db) {
            console.log("! DB Added succeeded.");
            myId = db.key;
            console.log("Newly added ID:", myId);
        })
        .catch(function (error) {
            console.log("! DB Added failed: " + error.message);
        });
}

function sendData(data) {
    if (myId) {
        dbRef.child(myId).set(data)
            .then(() => {
                console.log("Data updated successfully.");
            })
            .catch((error) => {
                console.error("Failed to update data:", error.message);
            });
    } else {
        console.error("myId is not defined or invalid.");
    }
}

function setupDB() {
    const firebaseConfig = {
        apiKey: "AIzaSyD1vzsvSjdUX3ErubNQyB2Xb9REuqHffkg",
        authDomain: "projectt-16219.firebaseapp.com",
        databaseURL: "https://projectt-16219-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "projectt-16219",
        storageBucket: "projectt-16219.firebasestorage.app",
        messagingSenderId: "1093216547255",
        appId: "1:1093216547255:web:f20b5cd78a5df8d9007832"
    };

    firebase.initializeApp(firebaseConfig);
    database = firebase.database();

    console.log(database);
}

function getDBRef(name) {
    let ref = database.ref(name);

    // event listeners
    ref.on("child_added", data => {
        console.log("! DB: Item added");
        console.log(data.key);
        console.log(data.val());
    });
    ref.on("child_removed", data => {
        console.log("! DB REMOVED");
        console.log(data.key);
        console.log(data.val());
    });
    ref.on("child_changed", data => {
        console.log("! DB CHANGED");
        console.log(data.key);
        console.log(data.val());
        posdata = data.val();
    });
    ref.on("child_moved", data => {
        console.log("! DB MOVED");
        console.log(data.key);
        console.log(data.val());
    });

    return ref;
}

function clearDBReference(refName) {
    let ref = database.ref(refName);

    // clear out the previous data in the key
    ref
        .remove()
        .then(function () {
            console.log("! DB Remove succeeded.");
        })
        .catch(function (error) {
            console.log("! DB Remove failed: " + error.message);
        });
}
