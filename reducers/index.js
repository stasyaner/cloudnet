import {START_FETCHING, ADD_ENTITY, REMOVE_ENTITY, CHECKING_AUTHENTICATION,
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

  // firebase.storage().ref('avatars/thumbnails/stasyaner_wall.jpg').getDownloadURL()
  // .then(url => {
  //   console.log(url);
  // });


  let initialState = {
    firebase,
    fetching: false,
    checkingAuthentication: true,
    showModal: false,
    user: null,
    userLoginError: {},
    entities: {
      users: {},
      news: {}
    }
  };

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
    case CHECKING_AUTHENTICATION: {
      return objectAssign({}, state, {
        checkingAuthentication: true
      });
      break;
    }
    case USER_LOGIN: {
      return objectAssign({}, state, {
        user: action.user
      });
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
        checkingAuthentication: false,
        user: null
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
