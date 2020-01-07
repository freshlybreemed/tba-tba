const actions = {
  GIT_SEARCH: 'GIT_SEARCH',
  FETCH_EVENTS: 'FETCH_EVENTS',
  FETCH_EVENT: 'FETCH_EVENT',
  GIT_SUCCESS_RESULT: 'GIT_SUCCESS_RESULT',
  GIT_ERROR_RESULT: 'GIT_ERROR_RESULT',
  FETCH_EVENTS_SUCCESS: 'FETCH_EVENTS_SUCCESS',
  gitSearch: searcText => ({
    type: actions.GIT_SEARCH,
    payload: { searcText, page: 1 },
  }),
  fetchEvents: userId => ({
    type: actions.FETCH_EVENTS,
    payload: { userId },
  }),
  fetchEvent: eventId => ({
    type: actions.FETCH_EVENT,
    payload: { eventId },
  }),
  fetchEventsSuccess: events => ({
    type: actions.FETCH_EVENTS_SUCCESS,
    payload: { events },
  }),
  onPageChange: (searcText, page) => ({
    type: actions.GIT_SEARCH,
    payload: { searcText, page },
  }),
  gitSearchSuccess: (result, total_count, page) => ({
    type: actions.GIT_SUCCESS_RESULT,
    result,
    total_count,
    page,
  }),
  gitSearchError: () => ({
    type: actions.GIT_ERROR_RESULT,
  }),
};
export default actions;
