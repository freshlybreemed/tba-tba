import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import noteSagas from './notes/saga';
import mailSagas from './mail/saga';
import todoSagas from './todos/saga';
import contactSagas from './contacts/saga';
import youtubeSearchSagas from './youtubeSearch/sagas';
import githubSearchSagas from './githubSearch/sagas';
import ecommerceSaga from './ecommerce/saga';
import createSaga from './create/saga';
import eventSaga from './events/saga';

export default function* rootSaga(getState) {
  yield all([
    createSaga(),
    authSagas(),
    noteSagas(),
    mailSagas(),
    todoSagas(),
    contactSagas(),
    youtubeSearchSagas(),
    githubSearchSagas(),
    ecommerceSaga(),
    eventSaga(),
  ]);
}
