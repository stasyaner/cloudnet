import * as actionTypes from './actionTypes';

export function startFetchingAction() {
  return {
    type: actionTypes.START_FETCHING
  }
}

export function addEntityAction(entityGroup, entity) {
  return {
    type: actionTypes.ADD_ENTITY,
    fetching: false,
    entityGroup,
    entity
  }
}

export function removeEntityAction(entityGroup, id) {
  return {
    type: actionTypes.REMOVE_ENTITY,
    fetching: false,
    entityGroup,
    id
  }
}

export function checkingAuthenticationAction() {
  return {
    type: actionTypes.CHECKING_AUTHENTICATION
  }
}

export function userLoginAction(user) {
  return {
    type: actionTypes.USER_LOGIN,
    user
  }
}

export function userLoginErrorAction(error) {
  return {
    type: actionTypes.USER_LOGIN_ERROR,
    error
  }
}

export function authenticationRequiredAction() {
  return {
    type: actionTypes.AUTHENTICATION_REQUIRED
  }
}
