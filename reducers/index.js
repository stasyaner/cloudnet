import objectAssign from 'object-assign';
import firebase from 'firebase';
import { START_FETCHING, END_FETCHING, ADD_ENTITY, REMOVE_ENTITY, USER_LOGIN, USER_LOGIN_ERROR,
  USER_LOGOUT_ERROR, AUTHENTICATION_REQUIRED, CLEAR_ENTITY_GROUP, SET_FRIEND_REQUEST_SENT_FLAG } from '../actions';

function getInitialState() {
  // Initialize Firebase
  const firebaseConfig = {
    apiKey: 'AIzaSyAsq7QMDe6An1YPK2wJrrZeyQJVwJjNsHg',
    authDomain: 'cloudnet-7a95b.firebaseapp.com',
    databaseURL: 'https://cloudnet-7a95b.firebaseio.com',
    storageBucket: 'cloudnet-7a95b.appspot.com',
  };
  firebase.initializeApp(firebaseConfig);

  const initialState = {
    firebase,
    fetching: false,
    user: null,
    userLoginError: null,
    userLogoutError: null,
    friendRequestSentFlag: null,
    entities: {
      users: {},
      news: {},
    },
  };

  return initialState;
}

const rootReducer = (state = getInitialState(), action) => {
  switch (action.type) {
    case START_FETCHING: {
      return objectAssign({}, state, {
        fetching: true,
      });
    }
    case END_FETCHING: {
      return objectAssign({}, state, {
        fetching: false,
      });
    }
    case ADD_ENTITY: {
      const value = objectAssign({}, state.entities[action.entityGroup], {
        [action.entity.id]: action.entity,
      });

      return objectAssign({}, state, {
        entities: objectAssign({}, state.entities, {
          [action.entityGroup]: value,
        }),
      });
    }
    case REMOVE_ENTITY: {
      const newState = objectAssign({}, state, {});
      delete newState.entities[action.entityGroup][action.id];

      return objectAssign({}, state, newState);
    }
    case CLEAR_ENTITY_GROUP: {
      const newState = objectAssign({}, state, {});
      delete newState.entities[action.entityGroup];

      return objectAssign({}, state, newState);
    }
    case USER_LOGIN: {
      return objectAssign({}, state, {
        user: action.user,
      });
    }
    case USER_LOGIN_ERROR: {
      return objectAssign({}, state, {
        userLoginError: action.error,
      });
    }
    case USER_LOGOUT_ERROR: {
      return objectAssign({}, state, {
        userLogoutError: action.error,
      });
    }
    case AUTHENTICATION_REQUIRED: {
      return objectAssign({}, state, {
        user: null,
      });
    }
    case SET_FRIEND_REQUEST_SENT_FLAG: {
      return objectAssign({}, state, {
        friendRequestSentFlag: action.flag,
      });
    }

    default: {
      return state;
    }
  }
};

export default rootReducer;
