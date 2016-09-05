import {browserHistory} from 'react-router';

export const START_FETCHING = 'START_FETCHING';
export const ADD_ENTITY = 'ADD_ENTITY';
export const REMOVE_ENTITY = 'REMOVE_ENTITY';
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

function addEntityAction(entityGroup, entity) {
  return {
    type: ADD_ENTITY,
    fetching: false,
    entityGroup,
    entity
  }
}

function removeEntityAction(entityGroup, id) {
  return {
    type: REMOVE_ENTITY,
    fetching: false,
    entityGroup,
    id
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
    getState().firebase.auth().onAuthStateChanged(user => {
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

    getState().firebase.auth().signInWithEmailAndPassword(email, password)
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
    getState().firebase.auth().signOut().then(() => {
      dispatch(authenticationRequiredAction());
      browserHistory.push('/login');
      //might be error too
    });
  }
}

export function fetchUserInfo(id) {
  return (dispatch, getState) => {

    const state = getState();

    dispatch(startFetchingAction());

    state.firebase.database().ref('/users/' + id).on('value',
      snapshot => {
        if (snapshot.val() !== state.entities.users[id]) {
          dispatch( addEntityAction('users', snapshot.val()) ) ;
        }
    });
  }
}


export function fetchUserNews(id) {
  return (dispatch, getState) => {

    dispatch(startFetchingAction());

    const state = getState();
    let userNews = state.firebase.database().ref('users/' + id + '/news');//.limitToFirst(1);
    let news = state.firebase.database().ref('news');

    userNews.on('child_added', newsId => {
      news.child(newsId.val()).on('value', singleNews => {
        dispatch( addEntityAction('news', singleNews.val()) ) ;
      });
    });

    userNews.on('child_removed', newsId => {
      dispatch( removeEntityAction('news', newsId.val()) ) ;
    });
  }
}
