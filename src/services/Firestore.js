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
//creates a new queue collection in the database with time created, user name of creator, and user ID of creator as items
export const createQueue = (userName, userId)=>{
    return db.collection('queues')
    .add({
        created: firebase.firestore.FieldValue.serverTimestamp(),
        createdBy: userId,
        owner: userName,
        /*users: [{
            userId: userId,
            name: userName
        }]*/
    });
};

//returns ID of queue
export const getQueue = queueId => {
    return db.collection('queues')
    .doc(queueId)
    .get();
};

//returns collection 'songs' in a given queue
export const getQueuedSongs = queueId=> {
    return db.collection('queues')
    .doc(queueId)
    .collection('songs')
    .get();
};

//used by SongList.js to list the songs in a queue
export const streamQueuedSongs = (queueId, observer) => {
    return db.collection('queues')
    .doc(queueId)
    .collection('songs')
    .orderBy('created')
    .onSnapshot(observer);
};

//unused function
export const getUsers = queueId => {
    return db.collection('queues')
    .doc(queueId)
    .collection('users')
    .get();
}
//unused function
export const streamUsersInQueue = (queueId, observer) => {
    return db.collection('queues')
    .doc(queueId)
    .collection('users')
    .orderBy('joined')
    .onSnapshot(observer);
};
//unused function
export const addUserToQueue = (userName, queueId, userId) => {
    return getUsers(queueId)
        .then(querySnapshot =>querySnapshot.docs)
        .then(usersInQueue => usersInQueue.find(user => user.data().userId === userName))
        .then(matchingUser => {
            if(!matchingUser) {
                return db.collection('queues')
                    .doc(queueId)
                    .collection('users')
                    .add({
                        userId: userId,
                        name: userName,
                        joined: firebase.firestore.FieldValue.serverTimestamp()
                    });
            }
            throw new Error('duplicate-user-error');
        });
};
//adds string song to the collection songs, with ID of user who added it as an item, and a timestamp
export const addSongToQueue = (song, queueId, userId) => {
    return getQueuedSongs(queueId)
        .then(querySnapshot => querySnapshot.docs)
        .then(queuedSongs => queuedSongs.find(queuedSong => queuedSong.data().name.toLowerCase() === song.toLowerCase()))
        .then(addSong => {

            return db.collection('queues')
            .doc(queueId)
            .collection('songs')
            .add({
                name: song,
                created: firebase.firestore.FieldValue.serverTimestamp(),
                createdBy: userId
            });

        });
};



