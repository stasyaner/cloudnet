export { START_FETCHING, END_FETCHING, ADD_ENTITY, REMOVE_ENTITY, CHECKING_AUTHENTICATION,
  USER_LOGIN, USER_LOGIN_ERROR, AUTHENTICATION_REQUIRED } from './actionTypes';
export { checkAuthentication, login, logout, fetchUserWall, addNews, removeNews, like,
  fetchUserInfo, fetchUserNews, fetchUserFriends, updateActivity, uploadAvatar } from './firebaseThunks';
