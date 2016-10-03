import configureMockStore from 'redux-mock-store';
import Firebase from '../utils/firebase';
import thunk from 'redux-thunk';
import {fetchUserInfo, fetchUserNews, fetchUserFriends, START_FETCHING,
  ADD_ENTITY, REMOVE_ENTITY, CHECKING_AUTHENTICATION, USER_LOGIN,
  USER_LOGIN_ERROR, AUTHENTICATION_REQUIRED} from '../../actions';
import expect from 'expect';

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('firebase fetch actions:', () => {
  let store;

  let initialStateFirebase = {
    users: {
      realUserId: {
        id: 'realUserId'
      },
      userIdWithNews: {
        id: 'userIdWithNews',
        news: {
          vmvlsfklfm2424asd: 'vmvlsfklfm2424asd'
        }
      },
      userIdAlreadyFetchedNews: {
        id: 'userIdAlreadyFetchedNews',
        news: {
          skmegnwjtrgn234sm: 'skmegnwjtrgn234sm'
        }
      },
      userIdWithFriends: {
        id: 'userIdWithFriends',
        friends: {
          skfmsfklgrkgFriend: 'skfmsfklgrkgFriend'
        }
      },
      skfmsfklgrkgFriend: {
        id: 'skfmsfklgrkgFriend'
      },
      userIdAlreadyFetchedFriends: {
        id: 'userIdAlreadyFetchedFriends',
        friends: {
          dkfmslkgmsklmfs: 'dkfmslkgmsklmfs'
        }
      },
      dkfmslkgmsklmfs: {
        id: 'dkfmslkgmsklmfs',
        description: 'alreadyFetchedFriend'
      }
    },
    news: {
      vmvlsfklfm2424asd: {
        id: 'vmvlsfklfm2424asd',
        data: 'newsOne'
      },
      skmegnwjtrgn234sm: {
        id: 'skmegnwjtrgn234sm',
        data: 'alreadyFetchedNews'
      }
    }
  };

  let firebase = new Firebase(initialStateFirebase);

  let initialState = {
    firebase,
    fetching: false,
    checkingAuthentication: true,
    user: null,
    userLoginError: {},
    entities: {
      users: {
        dkfmslkgmsklmfs: {
          id: 'dkfmslkgmsklmfs',
          description: 'alreadyFetchedFriend'
        }
      },
      news: {
        skmegnwjtrgn234sm: {
          id: 'skmegnwjtrgn234sm',
          data: 'alreadyFetchedNews'
        }
      }
    }
  };

  beforeEach(() => {
    store = mockStore(initialState);
  });

  afterEach(() => {
    store = null;
  });

  it('fetch a real user info', () => {
    const expectedActions = [
      { type: START_FETCHING },
      { type: ADD_ENTITY,
        entity: {
          id: 'realUserId'
        },
        entityGroup: 'users',
        fetching: false
      }
    ];

    store.dispatch(fetchUserInfo('realUserId'));

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('fetch user info with no args', () => {
    store.dispatch(fetchUserInfo());

    expect(store.getActions()).toEqual([]);
  });

  it('fetch a not existing user info', () => {
    const expectedActions = [
      { type: START_FETCHING }
    ];

    store.dispatch(fetchUserInfo('notExistingUserId'));

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('fetch already fetched user info', () => {
    const expectedActions = [
      { type: START_FETCHING }
    ];

    store.dispatch(fetchUserInfo('existingUserId'));

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('fetch a real user news', () => {
    const expectedActions = [
      { type: START_FETCHING },
      { type: ADD_ENTITY,
        entity: {
          id: 'vmvlsfklfm2424asd',
          data: 'newsOne'
        },
        entityGroup: 'news',
        fetching: false
      }
    ];

    store.dispatch(fetchUserNews('userIdWithNews'));

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('fetch user news with no args', () => {
    store.dispatch(fetchUserNews());

    expect(store.getActions()).toEqual([]);
  });

  it('fetch a not existing user news', () => {
    const expectedActions = [
      { type: START_FETCHING }
    ];

    store.dispatch(fetchUserNews('notExistingUserId'));

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('fetch already fetched user news', () => {
    const expectedActions = [
      { type: START_FETCHING }
    ];

    store.dispatch(fetchUserNews('userIdAlreadyFetchedNews'));

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('fetch a real user friends', () => {
    const expectedActions = [
      { type: START_FETCHING },
      { type: ADD_ENTITY,
        entity: {
          id: 'skfmsfklgrkgFriend'
        },
        entityGroup: 'users',
        fetching: false
      }
    ];

    store.dispatch(fetchUserFriends('userIdWithFriends'));

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('fetch user friends with no args', () => {
    store.dispatch(fetchUserFriends());

    expect(store.getActions()).toEqual([]);
  });

  it('fetch a not existing user friends', () => {
    const expectedActions = [
      { type: START_FETCHING }
    ];

    store.dispatch(fetchUserFriends('notExistingUserId'));

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('fetch already fetched user friends', () => {
    const expectedActions = [
      { type: START_FETCHING }
    ];

    store.dispatch(fetchUserNews('userIdAlreadyFetchedFriends'));

    expect(store.getActions()).toEqual(expectedActions);
  });
})
