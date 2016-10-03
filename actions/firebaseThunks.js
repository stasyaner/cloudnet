import {browserHistory} from 'react-router';
import objectAssign from 'object-assign';
import * as actionCreators from './actionCreators';

function userLogin(user) {
  return (dispatch, getState) => {
    if (user) {
      const state = getState();

      state.firebase.database().ref('users/' + user.uid).on('value',
        snapshot => {
          let userInfo = snapshot.val();
          delete userInfo.id;
          dispatch(actionCreators.userLoginAction(objectAssign({}, user, userInfo)));
      });
    }
  }
}

export function checkAuthentication() {
  return (dispatch, getState) => {

    dispatch(actionCreators.checkingAuthenticationAction());

    const state = getState();

    state.firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        dispatch(actionCreators.authenticationRequiredAction());
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
    if (email && password) {
      getState().firebase.auth().signInWithEmailAndPassword(email, password)
        .then(user => {
          dispatch(userLogin(user));
          browserHistory.push('/newsFeed');
        })
        .catch(error => {
          dispatch(actionCreators.userLoginErrorAction(error));
        });
    }
  }
}

export function logout() {
  return (dispatch, getState) => {
    getState().firebase.auth().signOut().then(() => {
      dispatch(actionCreators.authenticationRequiredAction());
      browserHistory.push('/login');
      //might be error too
    });
  }
}

export function fetchUserInfo(id) {
  return (dispatch, getState) => {
    if(id) {
      const state = getState();

      dispatch(actionCreators.startFetchingAction());

      state.firebase.database().ref('users/' + id).on('value',
        snapshot => {
          let userInfo = snapshot.val();
          if(userInfo) {
            if (!state.entities.users[id]) {
              dispatch(actionCreators.addEntityAction('users', userInfo));
            }
          }
      });
    }
  }
}

export function fetchUserNews(id) {
  return (dispatch, getState) => {
    if(id) {

      dispatch(actionCreators.startFetchingAction());

      let state = getState();
      let userNewsRef = state.firebase.database().ref('users/' + id + '/news');//.limitToFirst(1);
      let newsRef = state.firebase.database().ref('news');

      userNewsRef.on('child_added', snapshot => {
        let newsId = snapshot.val();
        if (newsId) {
          newsRef.child(newsId).on('value', snapshot => {

            state = getState();

            let singleNews = snapshot.val();

            if (singleNews && !state.entities.news[singleNews.id]) {
              dispatch(actionCreators.addEntityAction('news', singleNews)) ;
            }
          });
        }
      });

      userNewsRef.on('child_removed', snapshot => {
        state = getState();
        let newsId = snapshot.val();
        if(newsId && state.entities.news[newsId]) {
          dispatch(actionCreators.removeEntityAction('news', newsId)) ;
        }
      });
    }
  }
}

export function addNews(news) {
  return (dispatch, getState) => {
    if (news) {
      const state = getState();
      let userId = state.user.uid;

      if (userId) {
        let userNewsRef = state.firebase.database().ref('users/'
         + userId + '/news');

        news.author = userId;
        news.id = userNewsRef.push().key;

        let update = {
          ['users/' + userId + '/news/' + news.id]: news.id,
          ['news/' + news.id]: news
        };

        state.firebase.database().ref().update(update);
      }
    }
  }
}

export function removeNews(newsId) {
  return (dispatch, getState) => {
    if (newsId) {
      const state = getState();

      let update = {
        ['users/' + state.user.uid + '/news/' + newsId]: null,
        ['news/' + newsId]: null
      };

      state.firebase.database().ref().update(update);
    }
  }
}

export function like(newsId) {
  return (dispatch, getState) => {
    if (newsId) {
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
}

export function fetchUserFriends(id) {
  return (dispatch, getState) => {
    if (id) {

      dispatch(actionCreators.startFetchingAction());

      const state = getState();
      let userFriendsRef = state.firebase.database().ref('users/' + id + '/friends');
      let usersRef = state.firebase.database().ref('users');

      userFriendsRef.on('child_added', friendId => {
        usersRef.child(friendId.val()).on('value', snapshot => {
          let singleFriend = snapshot.val();
          if (singleFriend) {
            if (!state.entities.users[singleFriend.id]) {
              dispatch(actionCreators.addEntityAction('users', singleFriend)) ;
            }
          }
        });
      });

      userFriendsRef.on('child_removed', snapshot => {
        let friendId = snapshot.val();
        if (state.entities.users[friendId]) {
          dispatch(actionCreators.removeEntityAction('users', friendId));
        }
      });
    }
  }
}

export function updateActivity(userId) {
  return (dispatch, getState) => {
    if (userId) {
      const state = getState();
      state.firebase.database().ref('users/' + userId).update({
        lastActiveTimestamp: new Date().getTime()
      });
    }
  }
}

export function uploadAvatar(userId, avatar, avatarContext) {
  return (dispatch, getState) => {
    if (userId && avatar && avatarContext) {
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
}
