import { awsConstants } from '../_constants';
import { awsAccessService } from '../_services';
import { alertActions } from './';

export const awsActions = {
    getDynamodbTablesList,
    getDynamodbTableDetails,
    getDynamodbTableRecords
};

function getDynamodbTablesList() {
    return dispatch => {
        dispatch(request());

        // TODO: Add list pagination support (there is a 100 limit on the table names list returned from aws)
        awsAccessService.getDynamodbTablesList()
        .then(
            tableNames => {
                dispatch(success(tableNames));
            },
            error => {
                console.log(error.toString())
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        );
    };

    function request() { return { type: awsConstants.DYNAMODB_TABLES_LIST_REQUEST } }
    function success(accessibleServices) { return { type: awsConstants.DYNAMODB_TABLES_LIST_SUCCESS, services: accessibleServices } }
    function failure(error) { return { type: awsConstants.DYNAMODB_TABLES_LIST_FAILURE, error } }
}

function getDynamodbTableDetails(tableName) {
    return dispatch => {
        dispatch(request(tableName));

        awsAccessService.getDynamodbTableDetails(tableName)
        .then(
            tableDetails => {
                var tableColumns = tableDetails.AttributeDefinitions.map(atrribute => { return atrribute.AttributeName });
                dispatch(success(tableDetails, tableColumns));
            },
            error => {
                console.log(error.toString())
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        );
    };

    function request(tableName) { return { type: awsConstants.DYNAMODB_TABLE_DETAILS_REQUEST, selectedTable: tableName } }
    function success(tableDetails, tableColumns) { return { type: awsConstants.DYNAMODB_TABLE_DETAILS_SUCCESS, tableDetails, tableColumns } }
    function failure(error) { return { type: awsConstants.DYNAMODB_TABLE_DETAILS_FAILURE, error } }
}

function getDynamodbTableRecords(tableName) {
    return dispatch => {
        dispatch(request(tableName));

        var headersSet = [];
        var recordsSet = [];
        var formattedRecordsSet = [];
        // console.log("getDynamodbTableRecords calling getDynamodbTableRecordsRecursive");
        // var data = await awsAccessService.getDynamodbTableRecordsRecursive(tableName) || {Items:[]};
        // if (data.Items.length > 0){
        //     data.Items.map(record => {
        //         headersSet = headersSet.concat((Object.keys(record)).filter(x => !headersSet.includes(x)));
        //         recordsSet.push(record);
        //     });

        //     recordsSet.map(record => {
        //         let formattedRecord = [];
        //         headersSet.map(column => {
        //             formattedRecord.push(record[column] === undefined ? '' : record[column]);
        //         });

        //         formattedRecordsSet.push(formattedRecord);
        //     });

        //     console.log(headersSet)
        //     console.log(recordsSet)
        //     console.log(formattedRecordsSet)
        //     dispatch(success(formattedRecordsSet, headersSet));
        // } else {
        //     console.log("No Records Found!")
        //     dispatch(failure("No Records Found!"));
        //     dispatch(alertActions.error("No Records Found!"));
        // }
        awsAccessService.getDynamodbTableRecords(tableName)
        // awsAccessService.getDynamodbTableRecordsRecursive(tableName)
        .then(
            data => {
                console.log(data);

                data.Items.map(record => {
                    headersSet = headersSet.concat((Object.keys(record)).filter(x => !headersSet.includes(x)));
                    recordsSet.push(record);
                });

                recordsSet.map(record => {
                    let formattedRecord = [];
                    headersSet.map(column => {
                        formattedRecord.push(record[column] === undefined ? '' : record[column]);
                    });

                    formattedRecordsSet.push(formattedRecord);
                });

                console.log(headersSet)
                console.log(recordsSet)
                console.log(formattedRecordsSet)
                dispatch(success(formattedRecordsSet, headersSet));
            },
            error => {
                console.log(error.toString())
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        );
    };

    function request(tableName) { return { type: awsConstants.DYNAMODB_TABLE_EXPORT_REQUEST, selectedTable: tableName } }
    function success(tableRecords, tableColumns) { return { type: awsConstants.DYNAMODB_TABLE_EXPORT_SUCCESS, tableRecords, tableColumns } }
    function failure(error) { return { type: awsConstants.DYNAMODB_TABLE_EXPORT_FAILURE, errors: error } }
}

// function getDynamodbTableRecordBatches(tableName ) {
//     awsAccessService.getDynamodbTableRecords(tableName)
//     .then(
//         tableDetails => {
//             dispatch(success(tableDetails));
//         },
//         error => {
//             console.log(error.toString())
//             dispatch(failure(error.toString()));
//             dispatch(alertActions.error(error.toString()));
//         }
//     );
// }
