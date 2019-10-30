export const awsConstants = {
    DYNAMODB_TABLES_LIST_REQUEST: 'AWS_DYNAMODB_TABLES_LIST_REQUEST',
    DYNAMODB_TABLES_LIST_SUCCESS: 'AWS_DYNAMODB_TABLES_LIST_SUCCESS',
    DYNAMODB_TABLES_LIST_FAILURE: 'AWS_DYNAMODB_TABLES_LIST_FAILURE',

    DYNAMODB_TABLE_DETAILS_REQUEST: 'AWS_DYNAMODB_TABLE_DETAILS_REQUEST',
    DYNAMODB_TABLE_DETAILS_SUCCESS: 'AWS_DYNAMODB_TABLE_DETAILS_SUCCESS',
    DYNAMODB_TABLE_DETAILS_FAILURE: 'AWS_DYNAMODB_TABLE_DETAILS_FAILURE',

    DYNAMODB_TABLE_EXPORT_REQUEST: 'AWS_DYNAMODB_TABLE_EXPORT_REQUEST',
    DYNAMODB_TABLE_EXPORT_SUCCESS: 'AWS_DYNAMODB_TABLE_EXPORT_SUCCESS',
    DYNAMODB_TABLE_EXPORT_FAILURE: 'AWS_DYNAMODB_TABLE_EXPORT_FAILURE',

    SERVICES:[
        {
            namespace: 'iam',
            title: 'AWS IAM',
            presentable: false,
            accessible: false
        },
        {
            namespace: 'dynamodb',
            title: 'Amazon DynamoDB',
            component: 'DynamodbPage',
            presentable: true,
            accessible: true
        },
        {
            namespace: 'sqs',
            title: 'Amazon SQS',
            component: 'SqsPage',
            presentable: true,
            accessible: false
        }
    ]
};
