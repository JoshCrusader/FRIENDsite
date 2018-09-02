var firebase = require('firebase');
firebase.initializeApp({

    "serviceAccount": "./service-account.json",
    "databaseURL": "https://friendsite-994a4.firebaseio.com/",
});


module.exports = firebase;

/*
var ref = firebase.app().database().ref();

ref.once('value').then((snap) => {
    console.log('snap.val()', snap.val());
});
*/