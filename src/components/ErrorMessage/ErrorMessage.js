import React from 'react';
import './ErrorMessage.css';

function ErrorMessage(props) {

    const { errorCode } = props;

    function getErrorMessage() {
        switch(errorCode) {
            case 'anonymous-auth-failed':
                return 'Anonymous authentication failed. Try again.'
            case 'queue-not-found':
                return 'The queue could not be found. Try creating a new one.';
            case 'queue-get-fail':
                return 'Failed to retrieve the queue. Try again.';
            case 'add-song-error':
                return 'Failed to add song to list. Try again.';
            case 'create-queue-error':
                return 'Failed to create the queue. Try again.';
            case 'add-user-to-queue-error':
                return 'Failed to add user to the queue. Try again.';
            case 'song-desc-req':
                return 'song description required';
            case 'duplicate-song-error':
                return 'song on list already';
            case 'user-name-required':
                return 'your name is required';
            case 'queued-songs-get-fail':
                return 'failed to get queued songs';
            default:
                return 'Oops, something went wrong.';
        }
    }

    return errorCode ? <p className="error">{getErrorMessage()}</p> : null;
};

export default ErrorMessage;