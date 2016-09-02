import {browserHistory} from 'react-router';

export const START_FETCHING = 'START_FETCHING';
export const END_FETCHING = 'END_FETCHING';
export const USER_AUTHENTICATING = 'USER_AUTHENTICATING';
export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGIN_ERROR = 'USER_LOGIN_ERROR';
export const AUTHENTICATION_REQUIRED = 'AUTHENTICATION_REQUIRED';

export function startFetchingAction() {
  return {
    type: START_FETCHING,
    fetching: true
  }
}

function endFetchingAction(statePropToFetch, value) {
  return {
    type: END_FETCHING,
    fetching: false,
    statePropToFetch,
    value
  }
}

function userAuthenticatingAction() {
  return {
    type: USER_AUTHENTICATING
  }
}

function userLoginAction(user) {
  return {
    type: USER_LOGIN,
    user
  }
}

function userLoginErrorAction(error) {
  return {
    type: USER_LOGIN_ERROR,
    error
  }
}

function authenticationRequiredAction() {
  return {
    type: AUTHENTICATION_REQUIRED
  }
}

export function checkAuthentication() {
  return (dispatch, getState) => {
    return getState().firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        dispatch(authenticationRequiredAction());
        browserHistory.push('/login');
      }
      else {
        dispatch(userLoginAction(user));
      }
    });
  }
}

export function login(email, password) {
  return (dispatch, getState) => {

    dispatch(userAuthenticatingAction());

    return getState().firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => {
        dispatch(userLoginAction(user));
        browserHistory.push('/newsFeed');
      })
      .catch(error => {
        dispatch(userLoginErrorAction(error));
      });

  }
}

export function logout() {
  return (dispatch, getState) => {
    return getState().firebase.auth().signOut().then(() => {
      dispatch(authenticationRequiredAction());
      browserHistory.push('/login');
      //might be error too
    });
  }
}

// function fetchData(ref, statePropToFetch, callback) {
//   return (dispatch, getState) => {
//
//     const state = getState();
//
//     dispatch(startFetchingAction);
//
//     return state.firebase.database().ref(ref).on('value',
//       snapshot => {
//         if (snapshot.val() !== state.entities[statePropToFetch]) {
//           dispatch( endFetchingAction(statePropToFetch, snapshot.val()) ) ;
//         }
//     });
//   }
// }

export function fetchUserInfo(id) {
  return (dispatch, getState) => {

    const state = getState();

    dispatch(startFetchingAction);

    return state.firebase.database().ref('/users/' + id).on('value',
      snapshot => {
        if (snapshot.val() !== state.entities.users[id]) {
          dispatch( endFetchingAction('users', snapshot.val()) ) ;
        }
    });
  }
}

export function fetchUserNews(id) {
  return (dispatch, getState) => {

    const state = getState();

    dispatch(startFetchingAction);

    let userNews = state.firebase.database().ref('users/' + id + '/news');
    let news = state.firebase.database().ref('news');

    return userNews.on('child_added',
      singleUserNews => {
        news.child(singleUserNews.val()).on('value', singleNews => {
          dispatch( endFetchingAction('news', singleNews.val()) ) ;
        });
    });
  }
}
