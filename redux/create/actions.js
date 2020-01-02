const formActions = {
  SAVE_FIELDS: 'SAVE_FIELDS',
  EDIT_EVENT: 'EDIT_EVENT',
  saveField: field => {
    return (dispatch, getState) => {
      var form = {
        createdEventForm: {
          ...getState().Create.get('createdEventForm'),
          ...field,
        },
      };
      let event = {};
      for (var thing in form.createdEventForm) {
        event[thing] = form.createdEventForm[thing].value
          ? form.createdEventForm[thing].value
          : form.createdEventForm[thing];
      }
      if (form.createdEventForm.ticketTypes !== 'undefined') {
        event.ticketTypes = form.createdEventForm.ticketTypes;
      }
      event.organizerId = state.user.sub;
      const newForm = Object.assign({}, { createdEvent: event }, form);
      dispatch({ type: formActions.SAVE_FIELDS, dispatch: newForm });
    };
  },
};
