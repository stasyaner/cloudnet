import {START_FETCHING, ADD_ENTITY, REMOVE_ENTITY, USER_AUTHENTICATING,
  USER_LOGIN, USER_LOGIN_ERROR, AUTHENTICATION_REQUIRED,
  TOGGLE_MODAL} from '../actions';
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

  // firebase.storage().ref('avatars/thumbnails/marnature_wall.jpg').getDownloadURL()
  // .then(url => {
  //   console.log(url);
  // });


  let initialState = {
    firebase,
    fetching: false,
    authenticating: false,
    selectedUser: {},
    showModal: false,
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
    case TOGGLE_MODAL: {
      return objectAssign({}, state, {
        showModal: !state.showModal
      });
      break;
    }
    case START_FETCHING: {
      return objectAssign({}, state, {
        fetching: true
      });
      break;
    }
    case ADD_ENTITY: {
      let value = objectAssign({}, state.entities[action.entityGroup], {
        [action.entity.id]: action.entity
      });

      return objectAssign({}, state, {
        fetching: false,
        entities: objectAssign({}, state.entities, {
          [action.entityGroup]: value
        })
      });
      break;
    }
    case REMOVE_ENTITY: {
      let newState = objectAssign({}, state, {});
      delete newState.entities[action.entityGroup][action.id];
      newState.fetching = false;

      return objectAssign({}, state, newState);
      break;
    }
    case USER_AUTHENTICATING: {
      return objectAssign({}, state, {
        authenticating: true
      });
      break;
    }
    case USER_LOGIN: {
      if (state.user.id === action.user.id) {
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
