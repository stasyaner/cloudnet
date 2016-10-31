import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import Firebase from '../utils/firebase';
import { like, uploadAvatar, fetchUserWall, fetchUserInfo, fetchUserNews, fetchUserFriends,
  removeNews, addNews, updateActivity, userLogin, login, logout, checkAuthentication,
  START_FETCHING, END_FETCHING, ADD_ENTITY, USER_LOGIN, USER_LOGIN_ERROR,
  AUTHENTICATION_REQUIRED } from '../../actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let store;

const initialStateFirebase = {
  users: {
    realUserId: {
      id: 'realUserId',
    },
    singedInUser: {
      id: 'singedInUser',
    },
    userStateChanged: {
      id: 'userStateChanged',
    },
    userWithWall: {
      id: 'userWithWall',
      news: {
        vmvlsfklfm2424asd: 'vmvlsfklfm2424asd',
      },
      friends: {
        skfmsfklgrkgFriend: 'skfmsfklgrkgFriend',
      },
    },
    userIdWithNews: {
      id: 'userIdWithNews',
      news: {
        vmvlsfklfm2424asd: 'vmvlsfklfm2424asd',
      },
    },
    userIdWithFriends: {
      id: 'userIdWithFriends',
      friends: {
        skfmsfklgrkgFriend: 'skfmsfklgrkgFriend',
      },
    },
    skfmsfklgrkgFriend: {
      id: 'skfmsfklgrkgFriend',
    },
  },
  news: {
    vmvlsfklfm2424asd: {
      id: 'vmvlsfklfm2424asd',
      data: 'newsOne',
    },
  },
};
const firebase = new Firebase(initialStateFirebase);

const initialState = {
  firebase,
  fetching: false,
  checkingAuthentication: true,
  user: null,
  userLoginError: null,
  userLogoutError: null,
  entities: {
    users: {},
    news: {},
  },
};

describe('firebase fetch actions:', () => {
  beforeEach(() => {
    store = mockStore(initialState);
  });

  afterEach(() => {
    store = null;
  });

  it('fetch a real user info', () => {
    const expectedActions = [
      {
        type: ADD_ENTITY,
        entity: {
          id: 'realUserId',
        },
        entityGroup: 'users',
      },
    ];

    store.dispatch(fetchUserInfo('realUserId'));

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('fetch user info with no args', () => {
    store.dispatch(fetchUserInfo());

    expect(store.getActions()).toEqual([]);
  });

  it('fetch a not existing user info', () => {
    store.dispatch(fetchUserInfo('notExistingUserId'));

    expect(store.getActions()).toEqual([]);
  });

  it('fetch a real user news', () => {
    const expectedActions = [
      {
        type: ADD_ENTITY,
        entity: {
          id: 'vmvlsfklfm2424asd',
          data: 'newsOne',
        },
        entityGroup: 'news',
      },
    ];

    store.dispatch(fetchUserNews('userIdWithNews'));

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('fetch user news with no args', () => {
    store.dispatch(fetchUserNews());

    expect(store.getActions()).toEqual([]);
  });

  it('fetch a not existing user news', () => {
    store.dispatch(fetchUserNews('notExistingUserId'));

    expect(store.getActions()).toEqual([]);
  });

  it('fetch a real user friends', () => {
    const expectedActions = [
      {
        type: ADD_ENTITY,
        entity: {
          id: 'skfmsfklgrkgFriend',
        },
        entityGroup: 'users',
      },
    ];

    store.dispatch(fetchUserFriends('userIdWithFriends'));

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('fetch user friends with no args', () => {
    store.dispatch(fetchUserFriends());

    expect(store.getActions()).toEqual([]);
  });

  it('fetch a not existing user friends', () => {
    store.dispatch(fetchUserFriends('notExistingUserId'));

    expect(store.getActions()).toEqual([]);
  });

  it('fetch a real user wall', () => {
    const expectedActions = [
      {
        type: START_FETCHING,
      },
      {
        type: ADD_ENTITY,
        entity: {
          id: 'userWithWall',
          news: {
            vmvlsfklfm2424asd: 'vmvlsfklfm2424asd',
          },
          friends: {
            skfmsfklgrkgFriend: 'skfmsfklgrkgFriend',
          },
        },
        entityGroup: 'users',
      },
      {
        type: ADD_ENTITY,
        entity: {
          id: 'vmvlsfklfm2424asd',
          data: 'newsOne',
        },
        entityGroup: 'news',
      },
      {
        type: ADD_ENTITY,
        entity: {
          id: 'skfmsfklgrkgFriend',
        },
        entityGroup: 'users',
      },
      {
        type: END_FETCHING,
      },
    ];

    store.dispatch(fetchUserWall('userWithWall'));

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('fetch a not existing user wall', () => {
    store.dispatch(fetchUserWall());
    expect(store.getActions()).toEqual([]);
  });

  it('fetch a real user wall', () => {
    const expectedActions = [
      {
        type: START_FETCHING,
      },
      {
        type: END_FETCHING,
      },
    ];

    store.dispatch(fetchUserWall('notExistingUserId'));

    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('other firebase functions:', () => {
  beforeEach(() => {
    store = mockStore(initialState);
  });

  afterEach(() => {
    store = null;
  });

  it('upload avatar with no args', () => {
    expect(store.dispatch(uploadAvatar())).toEqual(undefined);
  });

  it('like with no args', () => {
    expect(store.dispatch(like())).toEqual();
  });

  it('removeNews with no args', () => {
    expect(store.dispatch(removeNews())).toEqual();
  });

  it('addNews with no args', () => {
    expect(store.dispatch(addNews())).toEqual();
  });

  it('removeNews with no args', () => {
    expect(store.dispatch(updateActivity())).toEqual();
  });

  it('merge firbase user with real userInfo', () => {
    const expectedActions = [
      {
        type: USER_LOGIN,
        user: {
          uid: 'realUserId',
        },
      },
    ];

    store.dispatch(userLogin({ uid: 'realUserId' }));

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('merge firbase user with userInfo with no args', () => {
    expect(store.dispatch(userLogin())).toEqual();
  });

  it('merge firbase user with unreal userInfo', () => {
    store.dispatch(userLogin({ uid: 'unrealUserId' }));

    expect(store.getActions()).toEqual([]);
  });

  it('user login', () => {
    const expectedActions = [
      {
        type: USER_LOGIN,
        user: {
          uid: 'singedInUser',
        },
      },
    ];

    return store.dispatch(login('someEmail', 'somePassword')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('user login error', () => {
    const expectedActions = [
      {
        type: USER_LOGIN_ERROR,
        error: {
          error: 'testSignInError',
        },
      },
    ];

    return store.dispatch(login('returnErrorTest', 'somePassword')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  // can't be tested for error
  it('user logout', () => {
    const expectedActions = [
      {
        type: AUTHENTICATION_REQUIRED,
      },
    ];

    return store.dispatch(logout()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  // can't be tested for error and to the full also as function sometimes dispatches
  // thunks not actions
  it('check authentication', () => {
    const expectedActions = [
      {
        type: USER_LOGIN,
        user: {
          uid: 'userStateChanged',
        },
      },
    ];

    store.dispatch(checkAuthentication());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
