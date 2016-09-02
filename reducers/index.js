import {START_FETCHING, END_FETCHING, USER_AUTHENTICATING, USER_LOGIN,
  USER_LOGIN_ERROR, AUTHENTICATION_REQUIRED} from '../actions';
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

  let initialState = {
    firebase,
    fetching: false,
    authenticating: false,
    selectedUser: {},
    user: firebase.auth().currentUser || {},
    userLoginError: {},
    entities: {
      users: {},
      news: {}
    }
  };

  // firebase.database().ref('/').once('value').then(snapshot => {
  //   initialState.entities = objectAssign({}, initialState.entities, snapshot.val());
  // }).catch(err => {console.log(err.message);});

  return initialState;
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
      let value = objectAssign({}, state.entities[action.statePropToFetch], {
        [action.value.id]: action.value
      });

      return objectAssign({}, state, {
        fetching: false,
        entities: objectAssign({}, state.entities, {
          [action.statePropToFetch]: value
        })
      });
      break;
    }
    case USER_AUTHENTICATING: {
      return objectAssign({}, state, {
        authenticating: true
      });
      break;
    }
    case USER_LOGIN: {
      if (state.user === action.user) {
        return state;
      }
      else {
        return objectAssign({}, state, {
          user: action.user
        });
      }
      break;
    }
    case USER_LOGIN_ERROR: {
      return objectAssign({}, state, {
        userLoginError: action.error
      });
      break;
    }
    case AUTHENTICATION_REQUIRED: {
      return objectAssign({}, state, {
        user: ''
      });
      break;
    }

    default: {
      return state;
      break;
    }
  }
}

export {rootReducer};
