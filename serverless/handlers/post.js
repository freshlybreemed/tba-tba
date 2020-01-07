// Local dependencies
const { handleErrors } = require('../helpers/error');
const { userApi, createAccountApi } = require('../helpers/user');
const { create } = require('../helpers/events');
const { createAccount, ticketApi, balanceApi } = require('../helpers/payments');
const { send } = require('micro');

const postApi = fn => async (req, res) => {
  try {
    const parse = req.url.split('/');
    console.log('post', `/${parse[2]}`);
    switch (`/${parse[2]}`) {
      case '/event':
        return await fn(create(req, res));
      case '/account':
        return await fn(createAccount(req, res));
      case '/charge':
        return await fn(ticketApi(req, res));
      case '/balance':
        return await fn(balanceApi(req, res));
      case '/user':
        return await fn(userApi(req, res));
      case '/connect':
        return await fn(createAccountApi(req, res));
      default:
        return send(res, 200, { err: 'invalid route' });
    }
  } catch (err) {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    console.error(err);
    return send(res, statusCode, message);
  }
};

module.exports = postApi(handleErrors);
