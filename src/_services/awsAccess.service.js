import AWS from 'aws-sdk/global';
import IAM from 'aws-sdk/clients/iam';
import DynamoDB from 'aws-sdk/clients/dynamodb';
import { awsConstants } from '../_constants';
import { awsAccessConfig } from '../_configs';

export const awsAccessService = {
    setup,
    getIamUser,
    getListPoliciesGrantingServiceAccess,
    getDynamodbTablesList,
    getDynamodbTableDetails,
    getDynamodbTableRecords,
    getConstantsForAwsService
};

function setup(accessKey, secret) {
    var awsCredentials = new AWS.Credentials(accessKey, secret);
    AWS.config.update({
        region: awsAccessConfig.AWS_ACCESS_REGION,
        apiVersions:{
            iam: awsAccessConfig.AWS_IAM_API_VERSION,
            dynamodb: awsAccessConfig.AWS_DYNAMODB_API_VERSION
        },
        credentials: awsCredentials
    });
}

function getIamUser() {
    var awsIam = new IAM();

    return new Promise((resolve, reject) => {
        awsIam.waitFor('userExists', {}, function(err, data) {
            if (err) {
                return reject(err);
            }

            return resolve(data.User);
        });
    });
}

function getListPoliciesGrantingServiceAccess(userArn, awsServiceNamespaces) {
    var awsIam = new IAM();

    return new Promise((resolve, reject) => {
        awsIam.listPoliciesGrantingServiceAccess({Arn: userArn, ServiceNamespaces: awsServiceNamespaces}, function(err, data) {
            if (err) {
                return reject(err);
            }

            return resolve(data.PoliciesGrantingServiceAccess);
        });
    });
}

function getDynamodbTablesList() {
    var awsDynamodb = new DynamoDB();

    return new Promise((resolve, reject) => {
        awsDynamodb.listTables({}, function(err, data) {
            if (err) {
                return reject(err);
            }

            return resolve(data.TableNames);
        });
    });
}

function getDynamodbTableDetails(tableName) {
    var awsDynamodb = new DynamoDB();

    return new Promise((resolve, reject) => {
        awsDynamodb.describeTable({ TableName: tableName }, function(err, data) {
            if (err) {
                return reject(err);
            }

            return resolve(data.Table);
        });
    });
}

function getDynamodbTableRecords(tableName) {
    var awsDocumentClient = new DynamoDB.DocumentClient({ convertEmptyValues: true });

    var params = { TableName: tableName, ReturnConsumedCapacity: 'TOTAL' };

    return new Promise((resolve, reject) => {
        awsDocumentClient.scan(params, function(err, data) {
            if (err) {
                return reject(err);
            }

            return resolve(data);
        });
    });
}

function getConstantsForAwsService(namespace = 'iam') {
    var serviceConstants;
    awsConstants.SERVICES.forEach(function(settings) {
        if (settings.namespace == namespace) {
            serviceConstants = settings;
        }
    });

    return serviceConstants;
}