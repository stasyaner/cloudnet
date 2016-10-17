import {startFetchingAction,
  addEntityAction, removeEntityAction, checkingAuthenticationAction,
  userLoginAction, userLoginErrorAction, authenticationRequiredAction}
  from '../../actions/actionCreators';
import {START_FETCHING, ADD_ENTITY, REMOVE_ENTITY,CHECKING_AUTHENTICATION,
  USER_LOGIN, USER_LOGIN_ERROR, AUTHENTICATION_REQUIRED} from '../../actions';
import expect from 'expect';

describe('action creators:', () => {
  it('should return "start fetching" action', () => {
    let expectedAction = {
      type: START_FETCHING
    };

    expect(startFetchingAction()).toEqual(expectedAction);
  });

  it('should return "add entity" action', () => {
    let expectedAction = {
      type: ADD_ENTITY,
      entityGroup: 'test',
      entity: 'testEntity',
    };

    expect(addEntityAction('test', 'testEntity')).toEqual(expectedAction);
  });

  it('should return "remove entity" action', () => {
    let expectedAction = {
      type: REMOVE_ENTITY,
      entityGroup: 'test',
      id: 'testId',
    };

    expect(removeEntityAction('test', 'testId')).toEqual(expectedAction);
  });

  it('should return "check authentication" action', () => {
    let expectedAction = {
      type: CHECKING_AUTHENTICATION
    };

    expect(checkingAuthenticationAction()).toEqual(expectedAction);
  });

  it('should return "user login" action', () => {
    let expectedAction = {
      type: USER_LOGIN,
      user: 'testUser'
    };

    expect(userLoginAction('testUser')).toEqual(expectedAction);
  });

  it('should return "user login error" action', () => {
    let expectedAction = {
      type: USER_LOGIN_ERROR,
      error: 'testError'
    };

    expect(userLoginErrorAction('testError')).toEqual(expectedAction);
  });

  it('should return "authentication required" action', () => {
    let expectedAction = {
      type: AUTHENTICATION_REQUIRED
    };

    expect(authenticationRequiredAction()).toEqual(expectedAction);
  });
});
