import { all, takeEvery, fork } from 'redux-saga/effects';
import actions from './actions';

export function* updateSettings() {
  yield takeEvery(actions.UPDATE_SETTINGS, function*() {});
}

export function* editSettings() {
  yield takeEvery(actions.EDIT_SETTINGS, function*() {});
}

export default function* rootSaga() {
  yield all([fork(updateSettings), fork(editSettings)]);
}
