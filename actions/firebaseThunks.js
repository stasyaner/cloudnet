import { browserHistory } from 'react-router';
import objectAssign from 'object-assign';
import * as actionCreators from './actionCreators';

function userLogin(user) {
  return (dispatch, getState) => {
    if (user) {
      const state = getState();

      state.firebase.database().ref(`users/${user.uid}`).on('value',
        (snapshot) => {
          const userInfo = snapshot.val();
          delete userInfo.id;
          dispatch(actionCreators.userLoginAction(objectAssign({}, user, userInfo)));
        }
      );
    }
  };
}

export function updateActivity(userId) {
  return (dispatch, getState) => {
    if (userId) {
      const state = getState();
      state.firebase.database().ref(`users/${userId}`).update({
        lastActiveTimestamp: new Date().getTime(),
      });
    }
  };
}

export function checkAuthentication() {
  return (dispatch, getState) => {
    dispatch(actionCreators.checkingAuthenticationAction());

    const state = getState();

    state.firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        dispatch(actionCreators.authenticationRequiredAction());
        browserHistory.push('/login');
      } else {
        dispatch(userLogin(user));
        dispatch(updateActivity(user.uid));
      }
    });
  };
}

export function login(email, password) {
  return (dispatch, getState) => {
    if (email && password) {
      getState().firebase.auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
          dispatch(userLogin(user));
          browserHistory.push('/newsFeed');
        })
        .catch((error) => {
          dispatch(actionCreators.userLoginErrorAction(error));
        });
    }
  };
}

export function logout() {
  return (dispatch, getState) => {
    getState().firebase.auth().signOut().then(() => {
      dispatch(actionCreators.authenticationRequiredAction());
      browserHistory.push('/login');
      // might be error too
    });
  };
}

export function fetchUserInfo(id) {
  return (dispatch, getState) => {
    if (id) {
      const state = getState();

      state.firebase.database().ref(`users/${id}`).on('value', (userInfoSnapshot) => {
        const userInfo = userInfoSnapshot.val();
        if (userInfo) {
          dispatch(actionCreators.addEntityAction('users', userInfo));
        }
      });
    }
  };
}

export function fetchUserNews(id) {
  return (dispatch, getState) => {
    if (id) {
      let state = getState();
      const userNewsRef = state.firebase.database().ref(`users/${id}/news`);// .limitToFirst(1);
      const newsRef = state.firebase.database().ref('news');

      userNewsRef.on('child_added', (newsIdSnapshot) => {
        const newsId = newsIdSnapshot.val();
        if (newsId) {
          newsRef.child(newsId).on('value', (singleNewsSnapshot) => {
            const singleNews = singleNewsSnapshot.val();
            if (singleNews) {
              dispatch(actionCreators.addEntityAction('news', singleNews));
            }
          });
        }
      });

      userNewsRef.on('child_removed', (snapshot) => {
        state = getState();
        const newsId = snapshot.val();
        if (newsId && state.entities.news[newsId]) {
          dispatch(actionCreators.removeEntityAction('news', newsId));
        }
      });
    }
  };
}

export function fetchUserFriends(id) {
  return (dispatch, getState) => {
    if (id) {
      let state = getState();
      const userFriendsRef = state.firebase.database().ref(`users/${id}/friends`);
      const usersRef = state.firebase.database().ref('users');

      userFriendsRef.on('child_added', (friendIdSnapshot) => {
        usersRef.child(friendIdSnapshot.val()).on('value', (singleFriendSnapshot) => {
          const singleFriend = singleFriendSnapshot.val();

          if (singleFriend) {
            dispatch(actionCreators.addEntityAction('users', singleFriend));
          }
        });
      });

      userFriendsRef.on('child_removed', (friendIdSnapshot) => {
        state = getState();
        const friendId = friendIdSnapshot.val();

        if (friendId && state.entities.users[friendId]) {
          dispatch(actionCreators.removeEntityAction('users', friendId));
        }
      });
    }
  };
}

export function fetchUserWall(id) {
  return (dispatch) => {
    dispatch(actionCreators.startFetchingAction());

    dispatch(fetchUserInfo(id));
    dispatch(fetchUserNews(id));
    dispatch(fetchUserFriends(id));

    dispatch(actionCreators.endFetchingAction());
  };
}

export function addNews(news) {
  return (dispatch, getState) => {
    if (news) {
      const state = getState();
      const userId = state.user.uid;
      const userNewsRef = state.firebase.database().ref(`users/${userId}/news`);
      const updatedNews = objectAssign({}, news, {
        author: userId,
        id: userNewsRef.push().key,
      });

      if (userId) {
        const update = {
          [`users/ ${userId}/news/${updatedNews.id}`]: updatedNews.id,
          [`news/ ${updatedNews.id}`]: updatedNews,
        };

        state.firebase.database().ref().update(update);
      }
    }
  };
}

export function removeNews(newsId) {
  return (dispatch, getState) => {
    if (newsId) {
      const state = getState();

      const update = {
        [`users/ ${state.user.uid}/news/${newsId}`]: null,
        [`news/ ${newsId}`]: null,
      };

      state.firebase.database().ref().update(update);
    }
  };
}

export function like(newsId) {
  return (dispatch, getState) => {
    if (newsId) {
      const state = getState();
      const newsLikesRef = state.firebase.database().ref(`news/${newsId}/likes`);

      newsLikesRef.child(state.user.uid).once('value').then((likeSnapshot) => {
        if (likeSnapshot.val()) {
          newsLikesRef.update({
            [state.user.uid]: null,
          });
        } else {
          newsLikesRef.update({
            [state.user.uid]: {
              timestamp: new Date().getTime(),
            },
          });
        }
      });
    }
  };
}

export function uploadAvatar(avatar, avatarContext) {
  return (dispatch, getState) => {
    const state = getState();
    const userId = state.user.uid;

    if (userId && avatar && avatarContext) {
      const userAvatarRef = state.firebase.database()
        .ref(`users/${userId}/avatar`);
      const avatarThumbnailsRef = state.firebase.storage().ref('images');

      const metadata = {
        contentType: 'image/jpeg',
      };

      avatarThumbnailsRef.child(`${userId}_${avatarContext}.jpg`)
        .put(avatar, metadata)
        .then((snapshot) => {
          userAvatarRef.update({
            [avatarContext]: snapshot.downloadURL,
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
  };
}
