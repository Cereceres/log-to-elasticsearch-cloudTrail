const zlib = require('zlib');

const data = {
    awslogs:{
        data:zlib.gzipSync(JSON.stringify({
            messageType: 'DATA_MESSAGE',
            owner: '658706153054',
            logGroup: '/aws/security/cloudtrail',
            logStream: '658706153054_CloudTrail_us-east-1',
            subscriptionFilters: [
                'LambdaStream_LogsToElasticsearch_CloudTrail_ABG'
            ], logEvents:    [
                {
                    id: '33734996458955511468499222473959962072652050041308315648',
                    timestamp: 1512729559422,
                    message: '{\"eventVersion\":\"1.05\",\"userIdentity\":{\"type\":\"AssumedRole\",\"principalId\":\"AROAJETZPRYDUT454DIDE:auto-tag-resources\",\"arn\":\"arn:aws:sts::658706153054:assumed-role/autotag-eu-west-1-658706153054-lambda-master-role/auto-tag-resources\",\"accountId\":\"658706153054\",\"accessKeyId\":\"ASIAJTD5IPXTJO2OIKJQ\",\"sessionContext\":{\"attributes\":{\"mfaAuthenticated\":\"false\",\"creationDate\":\"2017-12-08T08:34:03Z\"},\"sessionIssuer\":{\"type\":\"Role\",\"principalId\":\"AROAJETZPRYDUT454DIDE\",\"arn\":\"arn:aws:iam::658706153054:role/autotag-eu-west-1-658706153054-lambda-master-role\",\"accountId\":\"658706153054\",\"userName\":\"autotag-eu-west-1-658706153054-lambda-master-role\"}}},\"eventTime\":\"2017-12-08T10:30:40Z\",\"eventSource\":\"kms.amazonaws.com\",\"eventName\":\"Decrypt\",\"awsRegion\":\"eu-west-1\",\"sourceIPAddress\":\"52.17.247.185\",\"userAgent\":\"aws-internal/3\",\"requestParameters\":{\"encryptionContext\":{\"aws:lambda:FunctionArn\":\"arn:aws:lambda:eu-west-1:658706153054:function:auto-tag-resources\"}},\"responseElements\":null,\"requestID\":\"d6585d3b-dc02-11e7-8741-336d4ab0d2eb\",\"eventID\":\"d11531f2-631a-4a20-973a-41d4d7bd9409\",\"readOnly\":true,\"resources\":[{\"ARN\":\"arn:aws:kms:eu-west-1:658706153054:key/3f01ad73-4ed3-4c52-a6f1-7386dbe07235\",\"accountId\":\"658706153054\",\"type\":\"AWS::KMS::Key\"}],\"eventType\":\"AwsApiCall\",\"recipientAccountId\":\"658706153054\"}'
                }
            ]
        }))
    }
};


module.exports = data;
