import { Map } from 'immutable';

const initState = new Map({
  title: {
    value: '',
  },
  organizerId: '',
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
  discountCodes: {},
  expenses: {},
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
  refundable: true,
  tags: '',
  ticketTypes: {},
  doorTime: {
    value: '',
  },
  eventStatus: {
    value: 'draft',
  },
});

export default function reducer(state = initState, action) {
  switch (action.type) {
    case 'SAVE_FIELDS':
      return state.set('createdEventForm', action.newForm);
    default:
      return state;
  }
}
