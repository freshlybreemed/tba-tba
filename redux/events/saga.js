import { all, takeEvery, put, call } from 'redux-saga/effects';
import actions from './actions';
import axios from 'axios';
import userActions from '../auth/actions';
export const per_page = 10;
const gitSearchApi = `https://api.github.com/search/repositories?per_page=${per_page}&q=`;
const fetchEventsApi = `/api/events`;
const fetchEventApi = `/api/event`;

const onSearchReqeust = async (searcText, page = 1) =>
  await axios
    .get(`${gitSearchApi}${encodeURIComponent(searcText)}&page=${page}`)
    .then(res => res.json())
    .then(res => res.data)
    .catch(error => error);

const onEventsReqeust = async userId =>
  await axios
    .get(`${fetchEventsApi}/${userId}`)
    .then(res => res.data)
    .catch(error => error);

function* eventsRequest({ payload }) {
  console.log('man', payload);
  const { firebase } = payload;
  try {
    const eventsResult = yield call(onEventsReqeust, firebase.uid);
    yield put(actions.fetchEventsSuccess(eventsResult));
  } catch (error) {
    yield put(actions.fetchEventsSuccess());
  }
}
function* searchRequest({ payload }) {
  const { searcText, page } = payload;
  try {
    const searchResult = yield call(onSearchReqeust, searcText, page);
    if (searchResult.items && searchResult.total_count) {
      yield put(
        actions.gitSearchSuccess(
          searchResult.items,
          searchResult.total_count,
          page,
        ),
      );
    } else {
      yield put(actions.gitSearchSuccess());
    }
  } catch (error) {
    yield put(actions.gitSearchSuccess());
  }
}
export default function* rootSaga() {
  yield all([
    takeEvery(actions.GIT_SEARCH, searchRequest),
    takeEvery(actions.FETCH_EVENTS, eventsRequest),
    takeEvery(actions.FETCH_EVENT, eventsRequest),
    takeEvery(userActions.LOGIN_REQUEST, eventsRequest),
  ]);
}
