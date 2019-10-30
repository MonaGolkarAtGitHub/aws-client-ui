import { useAsync } from "react-async";
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
    getConstantsForAwsService,
    checkGlobalCredential
};

function setup(accessKey, secret) {
    var awsCredentials = new AWS.Credentials(accessKey, secret);
    AWS.config.update({
        region: awsAccessConfig.AWS_ACCESS_REGION,
        apiVersions:{
            iam: awsAccessConfig.AWS_IAM_API_VERSION
        },
        credentials: awsCredentials
    });
}

function authenticateIamUser() {
    var awsIam = new IAM();

    awsIam.waitFor('userExists', {}, function(err, data) {
        return (err ? false : true);
    });

    return false;
}

function getIamUser() {
    var awsIam = new IAM();

    return new Promise((resolve, reject) => {
        awsIam.waitFor('userExists', {}, function(err, data) {
            if (err) {
                return reject(err);
            }

            /*
            console.log(data);           // successful response
            data = {
                User: {
                    Arn: "arn:aws:iam::123456789012:user/Bob",
                    CreateDate: <Date Representation>,
                    Path: "/",
                    UserId: "AKIAIOSFODNN7EXAMPLE",
                    UserName: "Bob"
                }
            }
            */
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

            /*
            console.log(data);           // successful response
            data = {
                IsTruncated: false,
                PoliciesGrantingServiceAccess: [
                    {
                        Policies: [
                            {
                                PolicyArn: "arn:aws:iam::123456789012:policy/ExampleIamPolicy",
                                PolicyName: "ExampleIamPolicy",
                                PolicyType: "MANAGED"
                            },
                            {
                                EntityName: "AWSExampleGroup1",
                                EntityType: "GROUP",
                                PolicyName: "ExampleGroup1Policy",
                                PolicyType: "INLINE"
                            }
                        ],
                        ServiceNamespace: "iam"
                    },
                    {
                        Policies: [
                            {
                                PolicyArn: "arn:aws:iam::123456789012:policy/ExampleEc2Policy",
                                PolicyName: "ExampleEc2Policy",
                                PolicyType: "MANAGED"
                            }
                        ],
                        ServiceNamespace: "ec2"
                    }
                ]
            }
            */
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

            /*
            console.log(data);           // successful response
            data = {
                TableNames: [
                    "Forum",
                    "ProductCatalog",
                    "Reply",
                    "Thread"
                ]
            }
            */
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

            /*
            console.log(data);           // successful response
            data = {
                Table: {
                    AttributeDefinitions: [
                        {
                            AttributeName: "Artist",
                            AttributeType: "S"
                        },
                        {
                            AttributeName: "SongTitle",
                            AttributeType: "S"
                        }
                    ],
                    CreationDateTime: <Date Representation>,
                    ItemCount: 0,
                    KeySchema: [
                        {
                            AttributeName: "Artist",
                            KeyType: "HASH"
                        },
                        {
                            AttributeName: "SongTitle",
                            KeyType: "RANGE"
                        }
                    ],
                    ProvisionedThroughput: {
                        NumberOfDecreasesToday: 1,
                        ReadCapacityUnits: 5,
                        WriteCapacityUnits: 5
                    },
                    TableName: "Music",
                    TableSizeBytes: 0,
                    TableStatus: "ACTIVE"
                }
            }
            */
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

            /*
            console.log(data);           // successful response
            data = {
                ConsumedCapacity: {
                    TableName: "development_bv_order_data_history",
                    CapacityUnits: 0.5
                },
                Count: 1,
                Items: [
                    {
                        bidPrice: 1000
                        buybackGuideId: 110331
                        buyerId: 273
                        buyerMarketId: 10648314344
                        bvOrderId: 1393
                        details: "Good Connecting readers with great books since 1972. Used books may not include companion materials, some shelf wear, may contain highlighting/notes, and may not include cd-rom or access codes. Customer service is our top priority!"
                        productId: 23365470
                        requestedQuantity: 1
                    }
                ],
                ScannedCount: 1
            }
            */
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

function checkGlobalCredential() {
    AWS.config.getCredentials(function(err) {
        if (err) console.log(err.stack);
        // credentials not loaded
        else {
          console.log("Access key:", AWS.config.credentials.accessKeyId);
          console.log("Secret access key:", AWS.config.credentials.secretAccessKey);
        }
    });
}