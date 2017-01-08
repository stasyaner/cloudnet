import * as actionTypes from './actionTypes';

export function startFetchingAction() {
  return {
    type: actionTypes.START_FETCHING,
  };
}

export function endFetchingAction() {
  return {
    type: actionTypes.END_FETCHING,
  };
}

export function addEntityAction(entityGroup, entity) {
  return {
    type: actionTypes.ADD_ENTITY,
    entityGroup,
    entity,
  };
}

export function removeEntityAction(entityGroup, id) {
  return {
    type: actionTypes.REMOVE_ENTITY,
    entityGroup,
    id,
  };
}

export function clearEntityGroupAction(entityGroup) {
  return {
    type: actionTypes.CLEAR_ENTITY_GROUP,
    entityGroup,
  };
}

export function checkingAuthenticationAction() {
  return {
    type: actionTypes.CHECKING_AUTHENTICATION,
  };
}

export function userLoginAction(user) {
  return {
    type: actionTypes.USER_LOGIN,
    user,
  };
}

export function userLoginErrorAction(error) {
  return {
    type: actionTypes.USER_LOGIN_ERROR,
    error,
  };
}

export function userLogoutErrorAction(error) {
  return {
    type: actionTypes.USER_LOGOUT_ERROR,
    error,
  };
}

export function authenticationRequiredAction() {
  return {
    type: actionTypes.AUTHENTICATION_REQUIRED,
  };
}

export function setFriendRequestSentFlagAction(flag) {
  return {
    type: actionTypes.SET_FRIEND_REQUEST_SENT_FLAG,
    flag,
  };
}
