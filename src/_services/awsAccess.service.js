import AWS from 'aws-sdk/global';
import IAM from 'aws-sdk/clients/iam';
import { awsAccessConfig } from '../_configs';

export const awsAccessService = {
    setup,
    getIamUser,
    getListGroupsForIAMUser,
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
        // if (err) {
        //     console.log(err, err.stack); // an error occurred
        // } else {
        //     console.log(data);           // successful response
        // }
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

function getIamPolicy() {
    var awsIam = new IAM();

    return new Promise((resolve, reject) => {
        awsIam.waitFor('policyExists', {}, function(err, data) {
            if (err) {
                return reject(err);
            }

            /*
            console.log(data);           // successful response
            data = {
                Role: {
                Arn: "arn:aws:iam::123456789012:role/Test-Role",
                AssumeRolePolicyDocument: "<URL-encoded-JSON>",
                CreateDate: <Date Representation>,
                Path: "/",
                RoleId: "AROADBQP57FF2AEXAMPLE",
                RoleName: "Test-Role"
                }
            }
            */
            return resolve(data);
        });
    });
}

function getListGroupsForIAMUser(username) {
    var awsIam = new IAM();

    return new Promise((resolve, reject) => {
        awsIam.listGroupsForUser({UserName: username}, function(err, data) {
        if (err) {
            console.log(err, err.stack); // an error occurred
        } else {
            console.log(data);           // successful response
        }
        // if (err) {
        //         return reject(err);
        //     }
        //     console.log(data);           // successful response

        //     /*
        //     console.log(data);           // successful response
        //     data = {
        //         Role: {
        //         Arn: "arn:aws:iam::123456789012:role/Test-Role",
        //         AssumeRolePolicyDocument: "<URL-encoded-JSON>",
        //         CreateDate: <Date Representation>,
        //         Path: "/",
        //         RoleId: "AROADBQP57FF2AEXAMPLE",
        //         RoleName: "Test-Role"
        //         }
        //     }
        //     */
        //     return resolve(data);
        });
    });
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