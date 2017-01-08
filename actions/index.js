export { START_FETCHING, END_FETCHING, ADD_ENTITY, REMOVE_ENTITY, CHECKING_AUTHENTICATION,
  USER_LOGIN, USER_LOGIN_ERROR, USER_LOGOUT_ERROR, AUTHENTICATION_REQUIRED, CLEAR_ENTITY_GROUP,
  SET_FRIEND_REQUEST_SENT_FLAG } from './actionTypes';
export { checkAuthentication, login, logout, fetchUserWall, addNews, removeNews, like, userLogin,
  fetchUserInfo, fetchUserNews, fetchUserFriends, updateActivity, uploadAvatar, searchUser,
  toggleFriend, checkFriendRequestSent, checkFriendRequestSentSetFlag } from './firebaseThunks';
