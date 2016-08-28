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

function endFetchingAction(data) {
  return {
    type: END_FETCHING,
    fetching: false,
    data: data
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

export function checkAuthentication(firebase) {
  return dispatch => {
    return firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        dispatch(authenticationRequiredAction());
        browserHistory.push('/login');
      }
      else {
        dispatch(userLoginAction(user));
        browserHistory.push('/');
      }
    });
  }
}

export function login(firebase, email, password) {
  return dispatch => {

    dispatch(userAuthenticatingAction());

    return firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => {
        dispatch(userLoginAction(user));
        browserHistory.push('/newsFeed');
      })
      .catch(error => {
        dispatch(userLoginErrorAction(error));
      });

  }
}

export function logout(firebase) {
  return dispatch => {
    return firebase.auth().signOut().then(() => {
      dispatch(authenticationRequiredAction());
      browserHistory.push('/login');
      //might be error too
    });
  }
}

export function fetchData(firebase, ref) {
  return function (dispatch) {

    dispatch(startFetchingAction);

    return firebase.database().ref(ref).on('value',
      snapshot => { dispatch( endFetchingAction(snapshot.val()) ) });
  }
}
