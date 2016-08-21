export const START_FETCHING = 'START_FETCHING';
export const END_FETCHING = 'END_FETCHING';

export function startFetchingAction() {
  return {
    type: START_FETCHING,
    fetching: true
  }
}

function endFetchingAction(data) {
  return {
    type: END_FETCHING,
    fetching: false,
    data: data
  }
}

export function fetchData(firebase, ref) {
  return function (dispatch) {

    dispatch(startFetchingAction);

    return firebase.database().ref(ref).on('value',
      snapshot => { dispatch( endFetchingAction(snapshot.val()) ) });
  }
}
