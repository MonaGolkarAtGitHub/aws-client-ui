import React from 'react';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem, Badge, Button } from 'reactstrap';
import { CSVLink } from 'react-csv';

import { awsActions, userActions } from '../_actions';
import {
    AuthenticatedHeader,
    LoadingSpinner,
    NotFoundWrapper
} from '../_components';

class AwsDynamodbPage extends React.Component {

    componentWillMount() {
        this.props.getDynamodbTablesList();
    }

    renderTablesList() {
        const { loadingTablesList, tablesList, selectedTable } = this.props;

        if (loadingTablesList) {
            return <LoadingSpinner />
        }

        if (!tablesList) {
            return <NotFoundWrapper message='No Table Found!' />
        }

        return (
            <ListGroup id='tablesList'>
                {tablesList.map((tableName, index) => (
                    <ListGroupItem tag='button' key={'table' + index} className={tableName == selectedTable ? ' active' : ''} action onClick={() => this.props.getDynamodbTableDetails(tableName)}>
                        {tableName}
                    </ListGroupItem>
                ))}
            </ListGroup>
        )
    }

    renderTableDetails() {
        const { selectedTable, loadingTableDetails, tableDetails } = this.props;

        if (!selectedTable) {
            return
        }

        if (loadingTableDetails) {
            return <LoadingSpinner />
        }

        if (!tableDetails) {
            return <NotFoundWrapper message='No Details Found For The Selected Table!' />
        }

        return (
            <div id='tableDetails'>
                <div className='card'>
                    <h5 className='card-header'>
                        {selectedTable} <Badge color='info' className='pl-2'>{tableDetails ? tableDetails.ItemCount + ' records' : '...'}</Badge>
                    </h5>
                    <div className='card-body'>
                        <h5 className='card-title'>Special title treatment</h5>
                        <p className='card-text'>{JSON.stringify(tableDetails)}</p>
                        {this.renderExportButton()}
                    </div>
                </div>
            </div>
        )
    }

    renderExportButton() {
        const { selectedTable, loadingTableRecords, tableRecords, tableColumns } = this.props;

        if (loadingTableRecords) {
            return <LoadingSpinner />
        }

        if (tableRecords) {
            let csvData = [tableColumns].concat(tableRecords);
            //console.log(csvData);
            return (
                <div className='d-flex justify-content-between w-100'>
                    <Button color='secondary' onClick={() => this.props.getDynamodbTableRecords(selectedTable)}>Export Data Again</Button>
                    <CSVLink id='csvLink' data={csvData} filename={selectedTable + '.csv'}>Download Exported Data</CSVLink>
                </div>
            )
        }

        return (
            <Button color='primary' onClick={() => this.props.getDynamodbTableRecords(selectedTable)}>Export Data</Button>
        )
    }

    render() {
        const { user, tablesList } = this.props;

        return (
            <div className='w-100'>
                <AuthenticatedHeader loggedInUser={user} />
                <div className='col-md-12 col-md-offset-3 pt-2 pb-5 my-2 bg-light w-100'>
                    <h3 className='my-3'>
                        DynamoDB Tables <Badge color='info' className='mx-2'>{tablesList ? tablesList.length : '...'}</Badge>
                    </h3>

                    <div className='row'>
                        <div className='col-sm-6'>
                            {this.renderTablesList()}
                        </div>
                        <div className='col-sm-6'>
                            {this.renderTableDetails()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { authentication, awsServices } = state;
    const { user } = authentication;
    const { loadingTablesList, tablesList, selectedTable, loadingTableDetails, tableDetails, tableColumns, loadingTableRecords, tableRecords } = awsServices;

    return { user, loadingTablesList, tablesList, selectedTable, loadingTableDetails, tableDetails, tableColumns, loadingTableRecords, tableRecords };
}

const mapActionsToProps = {
    logout: userActions.logout,
    getDynamodbTablesList: awsActions.getDynamodbTablesList,
    getDynamodbTableDetails: awsActions.getDynamodbTableDetails,
    getDynamodbTableRecords: awsActions.getDynamodbTableRecords
}

const connectedDynamodbPage = connect(mapStateToProps, mapActionsToProps)(AwsDynamodbPage);
export { connectedDynamodbPage as AwsDynamodbPage };