import {
  all,
  takeEvery,
  takeLatest,
  put,
  call,
  fork,
} from 'redux-saga/effects';
import { setCookie, removeCookie } from '../../helpers/session';
import { notification } from '../../components';
import JwtAuthentication from '../../helpers/jwtAuthentication';
import actions from './actions';
import axios from 'axios';

const fetchUserApi = `/api/user`;

const onUserReqeust = async user =>
  await fetch(`${fetchUserApi}`, {
    method: 'post',
    body: JSON.stringify(user),
  }).then(res => res.json());
export function* loginRequest({ payload }) {
  try {
    const userResult = yield call(onUserReqeust, payload);
    console.log('result', userResult);
    yield put({
      type: actions.LOGIN_SUCCESS,
      token: userResult,
      profile: 'Profile',
    });
  } catch (error) {
    yield put({ type: actions.LOGIN_ERROR });
  }
}

export function* jwtLoginRequest() {
  yield takeEvery(actions.JWT_LOGIN_REQUEST, function*({ payload }) {
    const result = yield call(JwtAuthentication.login, payload.userInfo);
    if (result.error) {
      notification('error', result.error);
      yield put({ type: actions.LOGIN_ERROR });
    } else {
      payload.history.push('/dashboard');
      yield put({
        type: actions.LOGIN_SUCCESS,
        token: result.token,
        profile: result.profile,
      });
    }
  });
}

export function* loginSuccess(payload) {
  console.log('paypay', payload);
  setCookie('login_saga', payload.token.uid);
  yield setCookie('id_token', payload.token.uid);
}

export function* loginError() {
  yield takeEvery(actions.LOGIN_ERROR, function*() {});
}

export function* logout() {
  yield takeEvery(actions.LOGOUT, function*() {
    removeCookie('id_token');
  });
}
export default function* rootSaga() {
  yield all([
    takeLatest(actions.LOGIN_REQUEST, loginRequest),
    // fork(loginRequest),
    fork(jwtLoginRequest),
    takeEvery(actions.LOGIN_SUCCESS, loginSuccess),
    fork(loginError),
    fork(logout),
  ]);
}
