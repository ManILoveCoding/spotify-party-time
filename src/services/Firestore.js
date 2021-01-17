import firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNuR2yOGcSkSZswzQK9BJQ7k1IcVZAK5w",
  authDomain: "spotify-party-time.firebaseapp.com",
  databaseURL: "https://spotify-party-time-default-rtdb.firebaseio.com",
  projectId: "spotify-party-time",
  storageBucket: "spotify-party-time.appspot.com",
  messagingSenderId: "1080894369434",
  appId: "1:1080894369434:web:686797f4ace2f97027b923",
  measurementId: "G-W5MYNNYH2Z"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

//observer registered in the onAuthStateChanged triggers, users accout data can be accessed from User object (which we do in App.js)
export const authenticateAnonymously = () => {
    return firebase.auth().signInAnonymously();
};
//creates a new room collection in the database with time created, user name of creator, and user ID of creator as items
export const createRoom = (userName, userId, roomId)=>{
    return db.collection('rooms')
    .add({
        created: firebase.firestore.FieldValue.serverTimestamp(),
        createdBy: userId,
        owner: userName,
        roomNo: roomId
    });
};

//returns ID of room
//TODO Make this return a string instead of not returning anything
export const getRoom = roomId => {
    let id = parseInt(roomId);
    db.collection("rooms").where("roomNo", "==", id)
    .get()
    .then(function(querySnapshot){
        querySnapshot.forEach(function(doc) {
            let room = doc.id;
            console.log(room);
            console.log(doc.id, " => ", doc.data());
            return room;
        });
    })
};

//returns collection 'songs' in a given room
export const getRoomSongs = roomId=> {
    return getRoom(roomId)
    .then(getSongs => {
        return db.collection('rooms').where("roomNo", "==", roomId).collection('songs').get()
    });
};

//adds string song to the collection songs, with ID of user who added it as an item, and a timestamp
export const addSongToRoom = (song, roomId) => {

    let room = getRoom(roomId);

    return room.collection('songs').add({
        name: song
    })
    .then(() => {
        return {result:'document updated'};
    });

    
    // return doc
    // .add({
    //     name: song,
    //     created: firebase.firestore.FieldValue.serverTimestamp()
    // })
    // .then(() => {
    //     return {result: 'doc-updated' };
    // });

    
    // return getRoomSongs(roomId)
    //     .then(addSong => {

    //         return db.collection('rooms').where("roomNo", "==", roomId)
    //         .collection('songs')
    //         .add({
    //             name: song,
    //             created: firebase.firestore.FieldValue.serverTimestamp(),
    //             //createdBy: userId
    //         });
    //     });
};



