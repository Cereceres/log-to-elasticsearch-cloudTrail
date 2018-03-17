const buildRequest = require('./build-request');
const makePost = require('./make-post');
const co = require('co');
const { ES_ENDPOINT:endpoint } = process.env;

if (!endpoint) throw new Error('ES_ENDPOINT is missing');

module.exports = (body) => co(function *() {
    const requestParams = buildRequest(endpoint, body);
    return yield makePost(requestParams)
        .catch((error) => Promise.reject(error));
})
    .catch((error) => ({ error }));
