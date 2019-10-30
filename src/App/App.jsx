import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { AwsDynamodbPage } from '../AwsDynamodbPage';
import { SqsPage } from '../AwsSqsPage';

class App extends React.Component {
    constructor(props) {
        super(props);

        history.listen((location, action) => {
            // clear alert on location change
            this.props.clearAlerts();
        });
    }

    render() {
        const { alert } = this.props;
        return (
            <div className="jumbotron">
                <div className="container">
                        {alert.message &&
                            <div className="col-sm-8 col-sm-offset-2">
                                <div className={`alert ${alert.type}`}>{alert.message}</div>
                            </div>
                        }
                        <Router history={history}>
                            <div>
                                <PrivateRoute exact path="/" component={HomePage} />
                                <PrivateRoute path="/dynamodb" component={AwsDynamodbPage} />
                                <PrivateRoute path="/sqs" component={SqsPage} />
                                <Route path="/login" component={LoginPage} />
                            </div>
                        </Router>
                </div>
            </div>
        );
    }
}

function mapState(state) {
    const { alert } = state;
    return { alert };
}

const actionCreators = {
    clearAlerts: alertActions.clear
};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };