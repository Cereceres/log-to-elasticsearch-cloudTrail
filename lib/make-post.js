const https = require('https');


module.exports = (requestParams) => new Promise((resolve, reject) => {
    console.log('doing request');
    const request = https
        .request(requestParams, (response) => {
            let responseBody = '';
            response.on('data', (chunk) => {
                responseBody = responseBody + chunk;
            });
            response.on('end', () => {
                const info = JSON.parse(responseBody);
                console.log('info : ', JSON.stringify(info));
                let failedItems;
                let success;

                if (response.statusCode >= 200 && response.statusCode < 299) {
                    failedItems = info.items.filter((x) => x.index.status >= 300);

                    success = {
                        attemptedItems: info.items.length,
                        successfulItems: info.items.length - failedItems.length,
                        failedItems: failedItems.length
                    };
                }

                const error = response.statusCode !== 200 || info.errors === true ? {
                    statusCode: response.statusCode,
                    responseBody
                } : null;
                resolve({ error, success, statusCode:response.statusCode, failedItems });
            });
        });
    request.on('error', (e) => {
        console.log('error listen: ', e);
        reject(e);
    });
    request.end(requestParams.body);
});
