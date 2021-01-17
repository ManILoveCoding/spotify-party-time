import React, { useEffect, useState } from 'react';
import * as FirestoreService from '../../../services/Firestore';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';

function SongList(props) {

    const { roomId } = props;

    const [ roomSongs, setRoomSongs ] = useState([]);
    const [ error, setError ] = useState();

    // Use an effect hook to subscribe to the Room songs stream and
    // automatically unsubscribe when the component unmounts.
    useEffect(() => {
        const unsubscribe = FirestoreService.streamRoomSongs(roomId, {
            next: querySnapshot => {
                const updatedRoomSongs = 
                    querySnapshot.docs.map(docSnapshot => docSnapshot.data());
                setRoomSongs(updatedRoomSongs);
            },
            error: () => setError('Room-song-get-fail')
        });
        return unsubscribe;
    }, [roomId, setRoomSongs]);

    const songElements = roomSongs
        .map((song, i) => <div key={i}>{song.name}</div>);

    return (
        <div>
            <ErrorMessage errorCode={error}></ErrorMessage>
            <div>{songElements}</div>
        </div>
    );
}

export default SongList;