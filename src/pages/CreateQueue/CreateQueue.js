import React, { useState } from 'react';
import './CreateQueue.css';
import * as FirestoreService from '../../services/Firestore';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

function  CreateQueue(props) {
    
    const { onCreate, userId } = props;

    const [ error, setError ] = useState();


    //creates a new queue collection by calling the createQueue function from firestore.js, passing the text input of the user and generating a new id for them. (i think, im not really sure what step initializes the userId honestly)
    function createQueue(e) {
        e.preventDefault();
        setError(null);

        const userName = document.createListForm.userName.value;
        if(!userName) {
            setError('user-name-required');
            return;
        }

        FirestoreService.createQueue(userName, userId)
        .then(docRef => {
            onCreate(docRef.id, userName);
        })
        .catch(reason => setError('create-list-error'));
    }

    return (
        <div>
            <header>
                <h1>Welcome to spotifypartytime we like to party!</h1>
            </header>
            <div className="create-container">
                <div>
                    <form name="createListForm">
                        <p><label>Whatcha Name?</label></p>
                        <p><input type="text" name="userName" /></p>
                        <ErrorMessage errorCode={error}></ErrorMessage>
                        <p><button onClick={createQueue}>Create a new queue</button></p>
                    </form>
                </div>
            </div>
        </div>
    );


}

export default CreateQueue;