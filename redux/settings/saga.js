import { all, takeEvery, takeLatest, fork, put } from 'redux-saga/effects';
import actions from './actions';
const fetchUserApi = `/api/user`;

export function* updateSettings() {
  yield takeEvery(actions.UPDATE_SETTINGS, function*() {});
}

const onUserSave = async user => {
  console.log('user', user);
  return await fetch(`${fetchUserApi}`, {
    method: 'post',
    body: JSON.stringify(user),
  }).then(res => res.json());
};
export function* saveSettings({ payload }) {
  console.log('trying');
  try {
    const userResult = yield call(onUserSave, payload);
    console.log('result', onUserSave);
    yield put({
      type: actions.SAVE_SETTINGS_SUCCESS,
      user: userResult,
    });
  } catch (error) {
    yield put({ type: actions.SAVE_SETTINGS_ERROR });
  }
}

export function* editSettings() {
  yield takeEvery(actions.EDIT_SETTINGS, function*() {});
}
export function* saveSuccess() {}

export default function* rootSaga() {
  yield all([
    fork(updateSettings),
    fork(editSettings),
    takeLatest(actions.SAVE_SETTINGS, saveSettings),
    takeEvery(actions.SAVE_SETTINGS_SUCCESS, saveSuccess),
  ]);
}
