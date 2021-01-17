import React, { useState } from 'react';
import './JoinQueue.css';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import * as FirestoreService from '../../services/Firestore';
import UserList from './UserList/UserList';
import AddUser from './AddUser/AddUser';

function JoinQueue(props) {

    const { users, queueId, onSelectUser, onCloseQueue, userId } = props;

    const [ error, setError ] = useState();

    /*
    function addExistingUser(e) {
        e.preventDefault();
        onSelectUser(e.target.innerText);
    }

    function getUserButtonList(){
        const buttonList = UserList.map(user => <button key={user.name} onClick={addExistingUser}>{user.name}</button>);
        return <div className="button-group">{buttonList}</div>;
    }

    function addNewUser(e) {
        e.preventDefault();
        setError(null);

        const userName = document.addUserToListForm.name.value;
        if(!userName) {
            setError('user-name-required');
            return;
        }

        if(users.find(user => user.name === userName)){
            onSelectUser(userName);
        } else {
            FirestoreService.addUserToQueue(userName, queueId, userId)
            .then(() => onSelectUser(userName))
            .catch(() => setError('add-user-to-queue-error'));
        }
    }*/

    function onCreateQueueClick(e) {
        e.preventDefault();
        onCloseQueue();
    }

    return (
        <div>
            <header>
                <h1>Welcome to spotifypartyime</h1>
            </header>
            <div className="join-container">
                <div>
                    <form name = "addUserToQueueForm">
                        <p>Select your name if you previously joined the queue...</p>
                        <div><UserList {...{queueId}}></UserList></div>
                        <div><AddUser {...{queueId}}></AddUser></div>
                        <ErrorMessage errorCode={error}></ErrorMessage>
                        <p>...or <a href="/" onClick={onCreateQueueClick}>create a new queue</a></p>
                    </form>
                </div>
                
            </div>
        </div>
    )

}

export default JoinQueue;
