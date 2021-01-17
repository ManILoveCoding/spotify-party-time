import React, { useEffect, useState } from 'react';
import * as FirestoreService from '../../../services/Firestore';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';

function SongList(props) {

    const { queueId } = props;

    const [ queuedSongs, setQueuedSongs ] = useState([]);
    const [ error, setError ] = useState();

    // Use an effect hook to subscribe to the queued songs stream and
    // automatically unsubscribe when the component unmounts.
    useEffect(() => {
        const unsubscribe = FirestoreService.streamQueuedSongs(queueId, {
            next: querySnapshot => {
                const updatedQueuedSongs = 
                    querySnapshot.docs.map(docSnapshot => docSnapshot.data());
                setQueuedSongs(updatedQueuedSongs);
            },
            error: () => setError('queued-song-get-fail')
        });
        return unsubscribe;
    }, [queueId, setQueuedSongs]);

    const songElements = queuedSongs
        .map((song, i) => <div key={i}>{song.name}</div>);

    return (
        <div>
            <ErrorMessage errorCode={error}></ErrorMessage>
            <div>{songElements}</div>
        </div>
    );
}

export default SongList;