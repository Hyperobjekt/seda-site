require("dotenv").config();
const winston = require('winston');
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console()
    ]
});

const redirectPath = process.env.REDIRECT_PATH;
const Mailchimp = require('mailchimp-api-v3')
const mailchimp = new Mailchimp(process.env.MAILCHIMP_API_KEY);
const listId = process.env.MAILCHIMP_SEDA_LIST_ID;
const dataGroupId = process.env.MAILCHIMP_DATA_INTEREST_ID;
const newsletterGroupId = process.env.MAILCHIMP_NEWSLETTER_INTEREST_ID;
const interests = {};
interests[dataGroupId] = true;
interests[newsletterGroupId] = true;

function getCallbackObj(statusCode, bodyObj) {
  return {
    statusCode: statusCode,
    headers: {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': 'x-requested-with, x-requested-by, Access-Control-Allow-Origin, content-type, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'
    },
    body: JSON.stringify(bodyObj)
  };
}

function subscribeUser(action, email, callback) {
  // logger.info('subscribeUser');
  mailchimp.post('/lists/' + listId + '/members/', {
    email_address : email,
    status : action,
    interests: interests
  })
  .then(function(results) {
    callback(null, getCallbackObj(200, {
      'result': 'success',
      'redirect': redirectPath,
      'data': results
    }))
  })
  .catch(function (err) {
    // logger.info('Request error.');
    // logger.info(err);
    // If the member already is on the list, just return success.
    if (err['title'] === 'Member Exists') {
      callback(null, getCallbackObj(200, {
        'result': 'success',
        'redirect': redirectPath,
        'data': err
      }))
    } else {
      callback(null, getCallbackObj(500, err))
    }
  })
}

function preflight(callback) {
  // logger.info('preflight');
  callback(null, getCallbackObj(204, {'result': 'Preflight success.'}))
}

exports.handler = (event, context, callback) => {
  // If it's a get request, we return the tweets data.
  // logger.info('inside handler');
  // logger.info(event);
  if (event.httpMethod === 'OPTIONS') {
    const result = preflight(callback);
  } else if (event.httpMethod === 'POST') {
    // logger.info(event.body);
    const data = JSON.parse(event.body);
    if (data.status && data.email) {
      const result = subscribeUser(data.status, data.email, callback);
    } else {
      const result = callback(null, getCallbackObj(501, {'result': 'Unknown MailChimp action or missing email.'}))
    }
  } else {
    const result = callback(null, getCallbackObj(500, {'result': 'Error: Wrong HTTP request type.'}))
  }
}
