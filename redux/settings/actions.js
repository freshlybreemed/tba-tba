const accountSettingsActions = {
  UPDATE_SETTINGS: 'UPDATE_SETTINGS',
  EDIT_SETTINGS: 'EDIT_SETTINGS',

  editSettings: () => {
    return (dispatch, getState) => {
      const accountSettings = getState().Auth.toJS().idToken.accountSettings;
      console.log('acc', accountSettings);
      var editedAccount = {};
      for (var thing in accountSettings) {
        editedAccount[thing] = {
          value: accountSettings[thing],
        };
      }
      console.log('editedAccount', editedAccount);
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
        accountSettings[thing] = form[thing].value;
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
