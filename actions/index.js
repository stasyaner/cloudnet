export { START_FETCHING, END_FETCHING, ADD_ENTITY, REMOVE_ENTITY, CHECKING_AUTHENTICATION,
  USER_LOGIN, USER_LOGIN_ERROR, USER_LOGOUT_ERROR, AUTHENTICATION_REQUIRED, CLEAR_ENTITY_GROUP } from './actionTypes';
export { checkAuthentication, login, logout, fetchUserWall, addNews, removeNews, like, userLogin,
  fetchUserInfo, fetchUserNews, fetchUserFriends, updateActivity, uploadAvatar, searchUser, toggleFriend } from './firebaseThunks';
