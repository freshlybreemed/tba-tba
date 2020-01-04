const actions = {
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  JWT_LOGIN_REQUEST: 'JWT_LOGIN_REQUEST',
  LOGOUT: 'LOGOUT',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_ERROR: 'LOGIN_ERROR',
  login: userInfo => ({
    type: actions.LOGIN_REQUEST,
    payload: { ...userInfo },
  }),
  jwtLogin: (history, userInfo) => ({
    type: actions.JWT_LOGIN_REQUEST,
    payload: { history, userInfo },
  }),
  logout: () => ({
    type: actions.LOGOUT,
  }),
};
export default actions;
