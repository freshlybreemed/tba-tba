import { all, takeEvery, fork } from 'redux-saga/effects';
import actions from './actions';

export function* saveField() {
  yield takeEvery(actions.SAVE_FIELDS, function*() {});
}
export function* ticketCreation() {
  yield takeEvery(actions.TICKET_CREATION, function*() {});
}
export function* ticketDeletion() {
  yield takeEvery(actions.TICKET_DELETION, function*() {});
}

export default function* rootSaga() {
  yield all([fork(saveField), fork(ticketCreation), fork(ticketDeletion)]);
}
