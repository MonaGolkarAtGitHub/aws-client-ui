import { awsConstants } from '../_constants';
import { awsActions } from '../_actions';

const initialState = {
    loadingTablesList: false,
    tablesList: null,
    selectedTable:'',
    loadingTableDetails: false,
    tableDetails: null,
    tableColumns: null,
    loadingTableRecords: false,
    tableRecords: null
};

export function awsServices(state = initialState, action) {
    switch (action.type) {
        case awsConstants.DYNAMODB_TABLES_LIST_REQUEST:
            return {
                ...state,
                loadingTablesList: true,
                tablesList: null
            };
        case awsConstants.DYNAMODB_TABLES_LIST_SUCCESS:
            return {
                ...state,
                loadingTablesList: false,
                tablesList: action.services
            };
        case awsConstants.DYNAMODB_TABLES_LIST_FAILURE:
            return {
                ...state,
                loadingTablesList: false,
                tablesList: null
            };

        case awsConstants.DYNAMODB_TABLE_DETAILS_REQUEST:
            return {
                ...state,
                selectedTable: action.selectedTable,
                loadingTableDetails: true,
                tableDetails: null,
                tableColumns: null,
                tableRecords: null
            };
        case awsConstants.DYNAMODB_TABLE_DETAILS_SUCCESS:
            return {
                ...state,
                loadingTableDetails: false,
                tableDetails: action.tableDetails,
                tableColumns: action.tableColumns
            };
        case awsConstants.DYNAMODB_TABLE_DETAILS_FAILURE:
            return {
                ...state,
                loadingTableDetails: false,
                tableDetails: null,
                tableColumns: null
            };

        case awsConstants.DYNAMODB_TABLE_EXPORT_REQUEST:
            return {
                ...state,
                loadingTableRecords: true,
                tableRecords: null
            };
        case awsConstants.DYNAMODB_TABLE_EXPORT_SUCCESS:
            return {
                ...state,
                loadingTableRecords: false,
                tableRecords: action.tableRecords,
                tableColumns: action.tableColumns
            };
        case awsConstants.DYNAMODB_TABLE_EXPORT_FAILURE:
            return {
                ...state,
                loadingTableRecords: false,
                tableRecords: null
            };

        default:
            return state
    }
  }