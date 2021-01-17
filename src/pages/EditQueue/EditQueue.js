import React from 'react';
import './EditQueue.css';
import AddSong from './AddSong/AddSong';
import SongList from './SongList/SongList';

function EditQueue(props) {

    const { queueId, user, onCloseQueue, userId } = props;

    function onCreateQueueClick(e) {
        e.preventDefault();
        onCloseQueue();
    }

    return (
        <div>
            <header className="app-header">
                <h1>Live Queue</h1>
                <p><strong>Hi {user}!</strong></p>
                <p>Add songs to the queue. When someone else adds a song it will instantly appear on the queue.</p>
            </header>
            <div className="edit-container">
                <div className="add-item-column">
                    <AddSong {...{queueId, userId}}></AddSong>
                </div>
                <div className="list-column">
                    <SongList {...{queueId}}></SongList>
                </div>
            </div>
            <footer className="app-footer">
                <p>Share your list with others using <a href={`/?listId=${queueId}`} target="_blank" rel="noopener noreferrer">this link</a> or <a href="/" onClick={onCreateQueueClick}>create a new queue</a>.</p>
            </footer>    
        </div>
    );
}

export default EditQueue;