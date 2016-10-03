export {START_FETCHING, ADD_ENTITY, REMOVE_ENTITY, CHECKING_AUTHENTICATION,
  USER_LOGIN, USER_LOGIN_ERROR, AUTHENTICATION_REQUIRED} from './actionTypes';
export {checkAuthentication, login, logout, fetchUserInfo, fetchUserNews,
  addNews, removeNews, like, fetchUserFriends, updateActivity, uploadAvatar
  } from './firebaseThunks';
