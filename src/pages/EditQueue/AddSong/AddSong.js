import React, { useState } from 'react';
import './AddSong.css';
import * as FirestoreService from '../../../services/Firestore';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage'


function AddSong(props) {

    const { queueId, userId } = props;

    const [error, setError] = useState('');

    function addSong(e) {
        e.preventDefault();
        setError(null);

        const songDesc = document.addItemForm.songDesc.value;
        if (!songDesc) {
            setError('song-desc-req');
            return;
        }

        FirestoreService.addSongToQueue(songDesc, queueId, userId)
            .then(() => document.addItemForm.reset())
            .catch(reason => {
                if (reason.message === 'duplicate-item-error') {
                    setError(reason.message);
                } else {
                    setError('add-list-item-error');
                }
            });
    }

    return (
        <form name="addItemForm">
            <h3>Can You Queue...</h3>
            <input type="text" name="songDesc" />
            <button type="submit" onClick={addSong}>Add</button>
            <ErrorMessage errorCode={error}></ErrorMessage>
        </form>
    );
}

export default AddSong;