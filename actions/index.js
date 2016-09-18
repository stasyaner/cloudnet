import {browserHistory} from 'react-router';
import objectAssign from 'object-assign';

export const START_FETCHING = 'START_FETCHING';
export const ADD_ENTITY = 'ADD_ENTITY';
export const REMOVE_ENTITY = 'REMOVE_ENTITY';
export const CHECKING_AUTHENTICATION = 'CHECKING_AUTHENTICATION';
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

function checkingAuthenticationAction() {
  return {
    type: CHECKING_AUTHENTICATION
  }
}

function userLoginAction(user) {
  return {
    type: USER_LOGIN,
    user
  }
}

function userLogin(user) {
  return (dispatch, getState) => {
    const state = getState();

    state.firebase.database().ref('users/' + user.uid).on('value',
      snapshot => {
        delete snapshot.val().id;
        dispatch(userLoginAction(objectAssign({}, user, snapshot.val())));
    });
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

    dispatch(checkingAuthenticationAction());

    const state = getState();

    state.firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        dispatch(authenticationRequiredAction());
        browserHistory.push('/login');
      }
      else {
        dispatch(userLogin(user));
        dispatch(updateActivity(user.uid));
      }
    });
  }
}

export function login(email, password) {
  return (dispatch, getState) => {

    getState().firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => {
        dispatch(userLogin(user));
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

    state.firebase.database().ref('users/' + id).on('value',
      snapshot => {
        if (!state.entities.users[id]) {
          dispatch( addEntityAction('users', snapshot.val()) );
        }
    });
  }
}

export function fetchUserNews(id) {
  return (dispatch, getState) => {

    dispatch(startFetchingAction());

    const state = getState();
    let userNewsRef = state.firebase.database().ref('users/' + id + '/news');//.limitToFirst(1);
    let newsRef = state.firebase.database().ref('news');

    userNewsRef.on('child_added', newsId => {
      newsRef.child(newsId.val()).on('value', singleNews => {
        if (singleNews.val()) {
          if (!state.entities.news.hasOwnProperty(singleNews.val().id)) {
            dispatch( addEntityAction('news', singleNews.val()) ) ;
          }
        }
      });
    });

    userNewsRef.on('child_removed', newsId => {
      dispatch( removeEntityAction('news', newsId.val()) ) ;
    });
  }
}

export function addNews(news) {
  return (dispatch, getState) => {
    const state = getState();
    let userNewsRef = state.firebase.database().ref('users/'
     + state.user.uid + '/news');

    news.author = userId;
    news.id = userNewsRef.push().key;

    let update = {
      ['users/' + userId + '/news/' + news.id]: news.id,
      ['news/' + news.id]: news
    };

    state.firebase.database().ref().update(update);
  }
}

export function removeNews(newsId) {
  return (dispatch, getState) => {

    const state = getState();

    let update = {
      ['users/' + state.user.uid + '/news/' + newsId]: null,
      ['news/' + newsId]: null
    };

    state.firebase.database().ref().update(update);
  }
}

export function like(newsId) {
  return (dispatch, getState) => {

    const state = getState();
    let newsLikesRef = state.firebase.database().ref('news/' + newsId +'/likes');

    newsLikesRef.child(state.user.uid).once('value').then(like => {
      if (like.val()) {
        newsLikesRef.update({
          [state.user.uid]: null
        });
      }
      else {
        newsLikesRef.update({
          [state.user.uid]: {
            timestamp: new Date().getTime()
          }
        });
      }
    });
  }
}

export function fetchUserFriends(id) {
  return (dispatch, getState) => {

    dispatch(startFetchingAction());

    const state = getState();
    let userFriendsRef = state.firebase.database().ref('users/' + id + '/friends');
    let usersRef = state.firebase.database().ref('users');

    userFriendsRef.on('child_added', friendId => {
      usersRef.child(friendId.val()).on('value', singleFriend => {
        if (singleFriend.val()) {
          if (!state.entities.users.hasOwnProperty(singleFriend.val().id)) {
            dispatch( addEntityAction('users', singleFriend.val()) ) ;
          }
        }
      });
    });

    userFriendsRef.on('child_removed', friendId => {
      dispatch( removeEntityAction('users', friendId.val()) ) ;
    });
  }
}

export function updateActivity(userId) {
  return (dispatch, getState) => {
    const state = getState();
    state.firebase.database().ref('users/' + userId).update({
      lastActiveTimestamp: new Date().getTime()
    });
  }
}

export function uploadAvatar(userId, avatar, avatarContext) {
  return (dispatch, getState) => {

    let state = getState();
    let userAvatarRef = state.firebase.database()
      .ref('users/' + userId + '/avatar/thumbnails');
    let avatarThumbnailsRef = state.firebase.storage().ref('avatars/thumbnails');

    let metadata = {
      contentType: 'image/jpeg',
    };

    avatarThumbnailsRef.child(userId + '_' + avatarContext +'.jpg')
      .put(avatar, metadata)
      .then(snapshot => {
        userAvatarRef.update({
          [avatarContext]: snapshot.downloadURL
        });

        // let user = objectAssign({}, state.user, {
        //   avatar: objectAssign({}, state.user.avatar, {
        //     thumbnails: objectAssign({}, state.user.avatar.thumbnails, {
        //       [avatarContext]: snapshot.downloadURL
        //     })
        //   })
        // });
        //
        // dispatch(userLogin(user));
      });
  }
}
