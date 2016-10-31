import expect from 'expect';
import objectAssign from 'object-assign';
import rootReducer from '../../reducers';
import { START_FETCHING, END_FETCHING, ADD_ENTITY, REMOVE_ENTITY, USER_LOGIN, USER_LOGIN_ERROR,
  USER_LOGOUT_ERROR, AUTHENTICATION_REQUIRED } from '../../actions';

describe('reducers:', () => {
  const initialState = {
    firebase: {},
    fetching: false,
    user: null,
    userLoginError: null,
    userLogoutError: null,
    entities: {
      users: {},
      news: {},
    },
  };


  // can't be tested passing no state because of the firebase
  it('initial state', () => {
    expect(rootReducer(initialState, {})).toEqual(initialState);
  });

  it('start fetching', () => {
    const expectedResult = objectAssign({}, initialState, { fetching: true });
    expect(rootReducer(initialState, { type: START_FETCHING })).toEqual(expectedResult);
  });

  it('end fetching', () => {
    expect(rootReducer(initialState, { type: END_FETCHING })).toEqual(initialState);
  });

  it('add entity', () => {
    const param = {
      type: ADD_ENTITY,
      entityGroup: 'users',
      entity: {
        id: 'testEntity',
      },
    };

    const expectedResult = objectAssign({}, initialState, {
      entities: objectAssign({}, initialState.entities, {
        users: {
          testEntity: {
            id: 'testEntity',
          },
        },
      }),
    });

    expect(rootReducer(initialState, param)).toEqual(expectedResult);
  });

  it('remove entity', () => {
    const param = {
      type: REMOVE_ENTITY,
      entityGroup: 'users',
      entity: {
        id: 'testEntity',
      },
    };

    expect(rootReducer(initialState, param)).toEqual(initialState);
  });

  it('user login', () => {
    const param = {
      type: USER_LOGIN,
      user: {
        id: 'testUserId',
      },
    };

    const expectedResult = objectAssign({}, initialState, {
      user: {
        id: 'testUserId',
      },
    });

    expect(rootReducer(initialState, param)).toEqual(expectedResult);
  });

  it('user login error', () => {
    const param = {
      type: USER_LOGIN_ERROR,
      error: 'testError',
    };

    const expectedResult = objectAssign({}, initialState, {
      userLoginError: 'testError',
    });

    expect(rootReducer(initialState, param)).toEqual(expectedResult);
  });

  it('user logout error', () => {
    const param = {
      type: USER_LOGOUT_ERROR,
      error: 'testError',
    };

    const expectedResult = objectAssign({}, initialState, {
      userLogoutError: 'testError',
    });

    expect(rootReducer(initialState, param)).toEqual(expectedResult);
  });

  it('authentication required', () => {
    const param = {
      type: AUTHENTICATION_REQUIRED,
    };

    expect(rootReducer(initialState, param)).toEqual(initialState);
  });
});
