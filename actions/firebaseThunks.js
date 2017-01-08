import { browserHistory } from 'react-router';
import objectAssign from 'object-assign';
import * as actionCreators from './actionCreators';

export function fetchCurrentUserFriendRequests() {
  return (dispatch, getState) => {
    const state = getState();
    const currentUserUid = state.user.uid;

    const userFriendRequestsRef = state.firebase.database().ref(`users/${currentUserUid}/friendRequests`);
    const friendRequestsRef = state.firebase.database().ref('friendRequests');

    userFriendRequestsRef.on('child_added', (friendRequestIdSnapshot) => {
      const friendRequestId = friendRequestIdSnapshot.val();

      friendRequestsRef.child(friendRequestId).on('value', (friendRequestSnapshot) => {
        const friendRequest = friendRequestSnapshot.val();

        dispatch(actionCreators.addEntityAction('currentUserFriendRequests', friendRequest));
      });
    });
  };
}

export function userLogin(user) {
  return (dispatch, getState) => {
    if (!user) return;

    const state = getState();
    state.firebase.database().ref(`users/${user.uid}`).on('value', (userInfoSnapshot) => {
      const userInfo = userInfoSnapshot.val();
      if (userInfo) {
        delete userInfo.id;
        dispatch(actionCreators.userLoginAction(objectAssign({}, user, userInfo)));
        //dispatch(fetchCurrentUserFriendRequests());
      }
    });
  };
}

export function login(email, password) {
  return (dispatch, getState) => {
    if (!email || !password) return null;

    const state = getState();
    return state.firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        dispatch(userLogin(user));

        // this check is for testing that is happening at server-side, therefore no browserHistory
        if (browserHistory) browserHistory.push('/newsFeed');
      })
      .catch((error) => {
        dispatch(actionCreators.userLoginErrorAction(error));
      });
  };
}

export function logout() {
  return (dispatch, getState) => {
    const state = getState();
    return state.firebase.auth().signOut()
      .then(() => {
        dispatch(actionCreators.authenticationRequiredAction());

        // this check is for testing that is happening at server-side, therefore no browserHistory
        if (browserHistory) browserHistory.push('/login');
      })
      .catch((error) => {
        dispatch(actionCreators.userLogoutErrorAction(error));
      });
  };
}

export function updateActivity(userId) {
  return (dispatch, getState) => {
    if (!userId) return;

    const state = getState();
    state.firebase.database().ref(`users/${userId}`).update({
      lastActiveTimestamp: new Date().getTime(),
    });
  };
}

export function checkAuthentication() {
  return (dispatch, getState) => {
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

export function fetchUserInfo(id) {
  return (dispatch, getState) => {
    if (!id) return;

    const state = getState();

    state.firebase.database().ref(`users/${id}`).on('value', (userInfoSnapshot) => {
      const userInfo = userInfoSnapshot.val();
      if (userInfo) dispatch(actionCreators.addEntityAction('users', userInfo));
    });
  };
}

export function fetchUserNews(id) {
  return (dispatch, getState) => {
    if (!id) return;

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
  };
}

export function fetchUserFriends(id) {
  return (dispatch, getState) => {
    if (!id) return;

    const state = getState();

    if (id === 'self') id = state.user.uid;

    const userFriendsRef = state.firebase.database().ref(`users/${id}/friends`);
    const usersRef = state.firebase.database().ref('users');

    userFriendsRef.on('child_added', (friendIdSnapshot) => {
      usersRef.child(friendIdSnapshot.key).on('value', (singleFriendSnapshot) => {
        const singleFriend = singleFriendSnapshot.val();

        if (singleFriend) {
          dispatch(actionCreators.addEntityAction('users', singleFriend));
        }
      });
    });

    // userFriendsRef.on('child_removed', (friendIdSnapshot) => {
    //   state = getState();
    //   const friendId = friendIdSnapshot.val();
    //
    //   if (friendId && state.entities.users[friendId]) {
    //     dispatch(actionCreators.removeEntityAction('users', friendId));
    //   }
    // });
  };
}

export function fetchUserWall(id) {
  return (dispatch) => {
    if (!id) return;

    dispatch(actionCreators.startFetchingAction());

    dispatch(fetchUserInfo(id));
    dispatch(fetchUserNews(id));
    dispatch(fetchUserFriends(id));

    dispatch(actionCreators.endFetchingAction());
  };
}

export function addNews(news) {
  return (dispatch, getState) => {
    const state = getState();
    const userId = state.user ? state.user.uid : null;

    if (!userId || !news) return;

    const userNewsRef = state.firebase.database().ref(`users/${userId}/news`);
    const updatedNews = objectAssign({}, news, {
      author: userId,
      id: userNewsRef.push().key,
    });
    const update = {
      [`users/${userId}/news/${updatedNews.id}`]: updatedNews.id,
      [`news/${updatedNews.id}`]: updatedNews,
    };

    state.firebase.database().ref().update(update);
  };
}

export function removeNews(newsId) {
  return (dispatch, getState) => {
    if (!newsId) return;

    const state = getState();
    const update = {
      [`users/${state.user.uid}/news/${newsId}`]: null,
      [`news/${newsId}`]: null,
    };

    state.firebase.database().ref().update(update);
  };
}

export function like(newsId) {
  return (dispatch, getState) => {
    if (!newsId) return;

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
  };
}

export function uploadAvatar(avatar, avatarContext) {
  return (dispatch, getState) => {
    const state = getState();
    const userId = state.user ? state.user.uid : null;

    if (!userId || !avatar || !avatarContext) return;

    const userAvatarRef = state.firebase.database().ref(`users/${userId}/avatar`);
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
      });
  };
}

// TODO: this may be not working
export function searchUser(displayName) {
  return (dispatch, getState) => {
    const state = getState();

    dispatch(actionCreators.clearEntityGroupAction('userSearchResult'));

    if (!displayName) return;

    const searchedUsersRef = state.firebase.database().ref('users').orderByChild('displayName').startAt(displayName);// .limitToFirst(1);

    searchedUsersRef.on('child_added', (userInfoSnapshot) => {
      const userInfo = userInfoSnapshot.val();

      if (userInfo) dispatch(actionCreators.addEntityAction('userSearchResult', userInfo));
    });
  };
}

export function checkFriendRequestSent_shit(toUserId) {
  return (dispatch, getState) => {
    if (!toUserId) return null;

    const state = getState();
    let sentRequestId = null;

    if (state.entities.currentUserFriendRequests) {
      const currentUserFriendRequestsArr = Object.keys(state.entities.currentUserFriendRequests);

      if (currentUserFriendRequestsArr.length > 0) {
        for (let i = 0; i < currentUserFriendRequestsArr.length; i += 1) {
          if (currentUserFriendRequestsArr[i].to === toUserId) {
            sentRequestId = currentUserFriendRequestsArr[i].id;
          }
        }
      }
    }

    console.log(sentRequestId);

    return sentRequestId;
  };
}

export function checkFriendRequestSent(toUserId) {
  return (dispatch, getState) => {
    const state = getState();

    if (!toUserId) return null;

    const currentUserUid = state.user.uid;
    const currentUserFriendRequestsRef = state.firebase.database().ref(`users/${currentUserUid}/friendRequests`);
    const friendRequestsRef = state.firebase.database().ref('friendRequests');

    return currentUserFriendRequestsRef.once('value').then((friendRequestsSnapshot) => {
      const friendRequests = friendRequestsSnapshot.val();

      const checkRequestPromiseArr = [];

      if (friendRequests) {
        const friendRequestsIdsArr = Object.keys(friendRequests);

        for (let i = 0; i < friendRequestsIdsArr.length; i += 1) {
          checkRequestPromiseArr.push(friendRequestsRef.child(friendRequestsIdsArr[i]).once('value').then((friendRequestSnapshot) => {
            const friendRequest = friendRequestSnapshot.val();

            let sentRequestId;
            if (friendRequest && (friendRequest.to === toUserId)) {
              sentRequestId = friendRequestsIdsArr[i];
            }
            return sentRequestId || false;
          }));
        }
      }

      return Promise.all(checkRequestPromiseArr).then((checkedRequestsArr) => {
        let sentRequestId = null;

        for (let i = 0; i < checkedRequestsArr.length; i += 1) {
          if (checkedRequestsArr[i] !== false) sentRequestId = checkedRequestsArr[i];
        }

        return sentRequestId || false;
      });
    });
  };
}

export function checkFriendRequestSentSetFlag(userId) {
  return (dispatch) => {
    dispatch(checkFriendRequestSent(userId)).then((sentRequestId) => {
      dispatch(actionCreators.setFriendRequestSentFlagAction(sentRequestId !== false));
    });
  };
}

export function checkFriendRequestSent_shit2(toUserId) {
  return (dispatch, getState) => {
    const state = getState();

    if (!toUserId) return;

    const currentUserUid = state.user.uid;
    const currentUserFriendRequestsRef = state.firebase.database().ref(`users/${currentUserUid}/friendRequests`);
    const toUserFriendRequestsRef = state.firebase.database().ref(`users/${toUserId}/friendRequests`);
    const friendRequestsRef = state.firebase.database().ref('friendRequests');

    currentUserFriendRequestsRef.on('value', (friendRequestsIdsSnapshot) => {
      const friendRequestsIds = friendRequestsIdsSnapshot.val();
      const friendRequestsIdsArr = Object.keys(friendRequestsIds);
      let sentRequestId = null;

      for (let i = 0; i < friendRequestsIdsArr.length; i += 1) {
        friendRequestsRef.child(friendRequestsIdsArr[i]).on('value', (friendRequestSnapshot) => {
          const friendRequest = friendRequestSnapshot.val();

          if (friendRequest.to === toUserId) sentRequestId = friendRequest.to;
          console.log(sentRequestId);
        });
      }
    });
  };
}

export function createFriendRequest(userId) {
  return (dispatch, getState) => {
    const state = getState();

    if (!userId) return;

    const currentUserUid = state.user.uid;
    const currentUserFriendRequestsRef = state.firebase.database().ref(`users/${currentUserUid}/friendRequests`);
    const toUserFriendRequestsRef = state.firebase.database().ref(`users/${userId}/friendRequests`);
    const friendRequestsRef = state.firebase.database().ref('friendRequests');

    const newfriendRequest = {
      id: friendRequestsRef.push().key,
      from: state.user.uid,
      to: userId,
      status: 'pending',
      timestamp: new Date().getTime(),
    };

    currentUserFriendRequestsRef.update({
      [newfriendRequest.id]: newfriendRequest.id,
    });
    toUserFriendRequestsRef.update({
      [newfriendRequest.id]: newfriendRequest.id,
    });
    friendRequestsRef.update({
      [newfriendRequest.id]: newfriendRequest,
    });
  };
}

export function cancelFriendRequest(userId, requestId) {
  return (dispatch, getState) => {
    const state = getState();

    if (!userId || !requestId) return;

    const currentUserUid = state.user.uid;
    const currentUserFriendRequestsRef = state.firebase.database().ref(`users/${currentUserUid}/friendRequests`);
    const toUserFriendRequestsRef = state.firebase.database().ref(`users/${userId}/friendRequests`);
    const friendRequestsRef = state.firebase.database().ref('friendRequests');

    const assignRequestNull = {
      [requestId]: null,
    };

    friendRequestsRef.update(assignRequestNull);
    currentUserFriendRequestsRef.update(assignRequestNull);
    toUserFriendRequestsRef.update(assignRequestNull);
  };
}

export function toggleFriendRequest(userId) {
  return (dispatch) => {
    if (!userId) return;

    dispatch(checkFriendRequestSent(userId)).then((sentRequestId) => {
      if (sentRequestId) {
        dispatch(cancelFriendRequest(userId, sentRequestId));
        dispatch(actionCreators.setFriendRequestSentFlagAction(false));
      } else {
        dispatch(createFriendRequest(userId));
        dispatch(actionCreators.setFriendRequestSentFlagAction(true));
      }
    });
  };
}

export function toggleFriend(userId) {
  return (dispatch, getState) => {
    const state = getState();

    if (!userId) return;

    const currentUserUid = state.user.uid;
    const currentUserFriendsRef = state.firebase.database().ref(`users/${currentUserUid}/friends`);
    const friendCheckRef = state.firebase.database().ref(`users/${currentUserUid}/friends/${userId}`);

    friendCheckRef.once('value').then((friendIdSnapshot) => {
      const friendId = friendIdSnapshot.val();

      if (friendId) {
        currentUserFriendsRef.update({
          [userId]: null,
        });
      } else {
        dispatch(toggleFriendRequest(userId));

        // currentUserFriendsRef.update({
        //   [userId]: userId,
        // });
      }
    });
  };
}
