import React, { useState } from 'react';
import './AddUser.css';
import * as FirestoreService from '../../../services/Firestore';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage'


function AddUser(props) {

    const { queueId, userId } = props;

    const [error, setError] = useState('');

    function addUser(e) {
        e.preventDefault();
        setError(null);

        const userDesc = document.addItemForm.userDesc.value;
        if (!userDesc) {
            setError('song-desc-req');
            return;
        }

        FirestoreService.addUserToQueue(userDesc, queueId, userId)
            .then(() => document.addItemForm.reset())
            .catch(reason => {
                if (reason.message === 'duplicate-user-error') {
                    setError(reason.message);
                } else {
                    setError('add-user-error');
                }
            });
    }

    return (
        <form name="addItemForm">
            <h3>Enter your name to join the queue</h3>
            <input type="text" name="userDesc" />
            <button type="submit" onClick={addUser}>Add</button>
            <ErrorMessage errorCode={error}></ErrorMessage>
        </form>
    );
}

export default AddUser;