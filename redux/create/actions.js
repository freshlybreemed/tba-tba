const formActions = {
  SAVE_FIELDS: 'SAVE_FIELDS',
  EDIT_EVENT: 'EDIT_EVENT',
  TICKET_CREATION: 'TICKET_CREATION',
  TICKET_DELETION: 'TICKET_DELETION',
  saveField: field => {
    return (dispatch, getState) => {
      var form = {
        ...getState().Create.toJS().createdEventForm,
        ...field,
      };

      let event = {};
      for (var thing in form) {
        event[thing] =
          typeof form[thing].value !== 'undefined'
            ? form[thing].value
            : form[thing];
      }
      // if (form.createdEventForm.ticketTypes !== 'undefined') {
      //   event.ticketTypes = form.createdEventForm.ticketTypes;
      // }
      // event.organizerId = state.user.sub;
      // const newForm = Object.assign({}, form);
      dispatch({
        type: formActions.SAVE_FIELDS,
        createdEventForm: form,
        createdEvent: event,
      });
    };
  },
  ticketCreation: ticket => {
    return (dispatch, getState) => {
      var obj = {
        ...getState().Create.toJS().createdEventForm.ticketTypes,
        ...ticket,
      };
      dispatch({
        type: formActions.TICKET_CREATION,
        createdEventForm: {
          ...getState().Create.toJS().createdEventForm,
          ticketTypes: { ...obj },
        },
        createdEvent: {
          ...getState().Create.toJS().createdEvent,
          ticketTypes: { ...obj },
        },
      });
    };
  },
  ticketDeletion: ticket => {
    return (dispatch, getState) => {
      let tickets = getState().Create.toJS().createdEventForm.ticketTypes;
      delete tickets[ticket];
      dispatch({
        type: formActions.TICKET_DELETION,
        createdEventForm: {
          ...getState().Create.toJS().createdEventForm,
          ticketTypes: { ...tickets },
        },
        createdEvent: {
          ...getState().Create.toJS().createdEvent,
          ticketTypes: { ...tickets },
        },
      });
    };
  },
};

export default formActions;
