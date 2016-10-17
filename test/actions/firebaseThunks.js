import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import Firebase from '../utils/firebase';
import { fetchUserWall, fetchUserInfo, fetchUserNews, fetchUserFriends, START_FETCHING,
  END_FETCHING, ADD_ENTITY } from '../../actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('firebase fetch actions:', () => {
  let store;

  const initialStateFirebase = {
    users: {
      realUserId: {
        id: 'realUserId',
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
    userLoginError: {},
    entities: {
      users: {},
      news: {},
    },
  };

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
});
