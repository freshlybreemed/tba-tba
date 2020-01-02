import { Map } from 'immutable';
import Router from 'next/router';
import { getToken } from '../../helpers/utility';
import actions from './actions';

const initState = new Map({
  idToken: null
});

export default function authReducer(
  state = initState.merge(getToken()),
  action
) {
  switch (action.type) {
    case actions.LOGIN_SUCCESS:
      Router.replace('/dashboard');
      return state.set('idToken', action.token);
    case actions.LOGOUT:
      Router.replace('/');
      return initState;
    default:
      return state;
  }
}
