import axios from "axios";

export const FETCHING = "FETCHING";
export const FETCHED = "FETCHED";
export const ERROR = "ERROR";
export const SAVING_FRIENDS ="SAVING_FRIENDS";
export const FRIENDS_SAVED = "FRIENDS_SAVED";
export const DELETING_FRIEND = "DELETING_FRIEND";
export const FRIEND_DELETED = "FRIEND_DELETED";


export const fetchingFriendsAction = () => {
        const request = axios.get('http://localhost:5000/api/friends/');

        return (dispatch) => {
        dispatch({type: FETCHING});

        request.then(response => {
        dispatch({type: FETCHED, friends: response.data});
    })

        .catch(err => {
        dispatch({type: ERROR, error: err});

    });
  };
};


export const addFriend = (name, age, email) => {
	const friend = {name:name, age:age, email:email};
        const request = axios.post('http://localhost:5000/api/friends/', friend);

        return (dispatch) => {
        dispatch({type: SAVING_FRIENDS});

        request.then(response => {
        dispatch({type: FRIENDS_SAVED, friends: response.data});
    })

        .catch(err => {
        dispatch({type: ERROR, error: err});

    });
  };
};


export const deleteFriend = (friendId) => {
        const friend = {id:friendId};
       
	const request = axios.delete(`http://localhost:5000/api/friends/${friendId}`,
        friend)


        return (dispatch) => {
        dispatch({type: DELETING_FRIEND});

        request.then(response => {
        dispatch({type: FRIEND_DELETED, friends: response.data});
    })

        .catch(err => {
        dispatch({type: ERROR, error: err});

    });
  };
};
