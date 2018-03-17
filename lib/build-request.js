const hmac = require('./hmac');
const hash = require('./hash');

module.exports = function buildRequest(endpoint, body) {
    console.log('endpoint ', endpoint);
    const endpointParts = endpoint.match(/^([^\.]+)\.?([^\.]*)\.?([^\.]*)\.amazonaws\.com$/);
    console.log('endpointParts ', endpointParts);
    const region = endpointParts[2];
    const service = endpointParts[3];
    const datetime = (new Date()).toISOString().replace(/[:\-]|\.\d{3}/g, '');
    const date = datetime.substr(0, 8);
    const kDate = hmac(`AWS4${ process.env.AWS_SECRET_ACCESS_KEY}`, date);
    const kRegion = hmac(kDate, region);
    const kService = hmac(kRegion, service);
    const kSigning = hmac(kService, 'aws4_request');
    console.log('1');
    const request = {
        host: endpoint,
        method: 'POST',
        path: '/_bulk',
        body,
        headers: {
            'Content-Type': 'application/json',
            'Host': endpoint,
            'Content-Length': Buffer.byteLength(body),
            'X-Amz-Security-Token': process.env.AWS_SESSION_TOKEN,
            'X-Amz-Date': datetime
        }
    };
    console.log('2');

    const canonicalHeaders = Object.keys(request.headers)
        .sort((a, b) => a.toLowerCase() < b.toLowerCase() ? -1 : 1)
        .map((k) => `${k.toLowerCase() }:${ request.headers[k]}`)
        .join('\n');
    console.log('3');

    const signedHeaders = Object.keys(request.headers)
        .map((k) => k.toLowerCase())
        .sort()
        .join(';');
    console.log('4');

    const canonicalString = [
        request.method,
        request.path, '',
        canonicalHeaders, '',
        signedHeaders,
        hash(request.body, 'hex'),
    ].join('\n');
    console.log('5');

    const credentialString = [ date, region, service, 'aws4_request' ].join('/');
    console.log('6');

    const stringToSign = [
        'AWS4-HMAC-SHA256',
        datetime,
        credentialString,
        hash(canonicalString, 'hex')
    ] .join('\n');
    console.log('7');

    request.headers.Authorization = [
        `AWS4-HMAC-SHA256 Credential=${ process.env.AWS_ACCESS_KEY_ID }/${ credentialString}`,
        `SignedHeaders=${ signedHeaders}`,
        `Signature=${ hmac(kSigning, stringToSign, 'hex')}`
    ].join(', ');
    console.log('8');

    return request;
};
