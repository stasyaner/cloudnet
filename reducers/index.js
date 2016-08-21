import {START_FETCHING, END_FETCHING, fetchData} from '../actions';
import objectAssign from 'object-assign';
import firebase from 'firebase';

function getInitialState() {

  //Initialize Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyAsq7QMDe6An1YPK2wJrrZeyQJVwJjNsHg",
    authDomain: "cloudnet-7a95b.firebaseapp.com",
    databaseURL: "https://cloudnet-7a95b.firebaseio.com",
    storageBucket: "cloudnet-7a95b.appspot.com",
  };
  firebase.initializeApp(firebaseConfig);

  return {
    firebase,
    fetching: false,
    data: 'test'
  }
}

const rootReducer = (state = getInitialState(), action) => {
  switch (action.type) {
    case START_FETCHING: {
      return objectAssign({}, state, {
        fetching: true
      });
      break;
    }
    case END_FETCHING: {
      return objectAssign({}, state, {
        fetching: false,
        data: action.data
      });
      break;
    };

    default: {
      return state;
      break;
    }
  }
}

export {rootReducer};
