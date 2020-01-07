import { Map } from 'immutable';
import Router from 'next/router';
import actions from './actions';

const initState = new Map({
  accountSettings: {},
  accountSettingsForm: {},
});
export default function createReducer(state = initState, action) {
  switch (action.type) {
    case actions.EDIT_SETTINGS:
      console.log('action', action);
      return state.set('accountSettingsForm', action.accountSettingsForm);
    case actions.UPDATE_SETTINGS:
      return state
        .set('accountSettingsForm', action.accountSettingsForm)
        .set('accountSettings', action.accountSettings);
    case actions.SAVE_SETTINGS_SUCCESS:
      console.log('save dispatch', action);
      return state;
    default:
      return state;
  }
}
