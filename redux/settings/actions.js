const accountSettingsActions = {
  UPDATE_SETTINGS: 'UPDATE_SETTINGS',
  EDIT_SETTINGS: 'EDIT_SETTINGS',
  SAVE_SETTINGS_SUCCESS: 'SAVE_SETTINGS_SUCCESS',
  SAVE_SETTINGS: 'SAVE_SETTINGS',
  SAVE_SETTINGS_ERROR: 'SAVE_SETTINGS_ERROR',
  updateSettingsSave: user => {
    console.log('saving');
    return dispatch =>
      dispatch({
        type: accountSettingsActions.SAVE_SETTINGS,
        payload: user,
      });
  },
  editSettings: () => {
    return (dispatch, getState) => {
      const accountSettings = getState().Auth.toJS().idToken.accountSettings;
      var editedAccount = {};
      for (var thing in accountSettings) {
        editedAccount[thing] = {
          value: accountSettings[thing],
        };
      }
      return dispatch({
        type: accountSettingsActions.EDIT_SETTINGS,
        accountSettingsForm: editedAccount,
      });
    };
  },
  updateSettings: field => {
    return (dispatch, getState) => {
      var form = {
        ...getState().Settings.toJS().accountSettingsForm,
        ...field,
      };

      let accountSettings = {};
      for (var thing in form) {
        accountSettings[thing] = form[thing].value
          ? form[thing].value
          : form[thing];
      }

      dispatch({
        type: accountSettingsActions.UPDATE_SETTINGS,
        accountSettingsForm: form,
        accountSettings: accountSettings,
      });
    };
  },
};
export default accountSettingsActions;
