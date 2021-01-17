import React, { useEffect, useState } from 'react';
import * as FirestoreService from '../../../services/Firestore';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';

function UserList(props) {

    const { queueId } = props;

    const [ usersInQueue, setUsersInQueue ] = useState([]);
    const [ error, setError ] = useState();

    // Use an effect hook to subscribe to the users stream and
    // automatically unsubscribe when the component unmounts.
    useEffect(() => {
        const unsubscribe = FirestoreService.streamUsersInQueue(queueId, {
            next: querySnapshot => {
                const updateUsersInQueue = 
                    querySnapshot.docs.map(docSnapshot => docSnapshot.data());
                setUsersInQueue(updateUsersInQueue);
            },
            error: () => setError('user-get-fail')
        });
        return unsubscribe;
    }, [queueId, setUsersInQueue]);

    const userElements = usersInQueue
        .map((user, i) => <div key={i}>{user.name}</div>);

    return (
        <div>
            <ErrorMessage errorCode={error}></ErrorMessage>
            <div>{userElements}</div>
        </div>
    );
}

export default UserList;