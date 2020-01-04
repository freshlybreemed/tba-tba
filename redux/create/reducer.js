import { Map } from 'immutable';
import createActions from './actions';

const initState = new Map({
  createdEventForm: {
    title: {
      value: '',
    },
    // organizerId: '',
    description: {
      value: `<p>Include <strong>need-to-know information</strong> to make it easier for people to search for your event page and buy tickets once they're there.</p><p><br></p><p><br></p><p><br></p>`,
    },
    endTime: {
      value: '',
    },
    endDate: {
      value: '',
    },
    startTime: {
      value: '',
    },
    eventType: {
      value: '',
    },
    startDate: {
      value: '',
    },
    cdnUri: {
      value: '',
    },
    // discountCodes: {},
    // expenses: {},
    image: '',
    location: {
      name: '',
      streetAddress: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
    },
    organizer: {
      value: '',
    },
    // refundable: true,
    // tags: '',
    ticketTypes: {},
    doorTime: {
      value: '',
    },
    eventStatus: {
      value: 'draft',
    },
  },
});

export default function createReducer(state = initState, action) {
  switch (action.type) {
    case createActions.SAVE_FIELDS:
      return state
        .set('createdEventForm', action.createdEventForm)
        .set('createdEvent', action.createdEvent);
    case createActions.TICKET_CREATION:
      return state
        .set('createdEventForm', action.createdEventForm)
        .set('createdEvent', action.createdEvent);
    case createActions.TICKET_DELETION:
      return state
        .set('createdEventForm', action.createdEventForm)
        .set('createdEvent', action.createdEvent);
    default:
      return state;
  }
}
