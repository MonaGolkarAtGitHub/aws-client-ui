import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { awsConstants } from '../_constants';
import { AuthenticatedHeader } from '../_helpers'

class SqsPage extends Component {
    componentDidMount() {
//        this.props.getUsers();
    }

    handleDeleteUser(id) {
//        return (e) => this.props.deleteUser(id);
    }

    render() {
        const { user } = this.props;
        var presentableAwsServices = awsConstants.SERVICES.filter(awsService => awsService.presentable)
        console.log(presentableAwsServices);

        return (
            <div className="w-100">
                <AuthenticatedHeader loggedInUser={user} />
                {presentableAwsServices &&
                    <div className="col-md-6 col-md-offset-3 pt-2 pb-5 my-2 bg-light w-100">
                        <h3 className="my-3">AWS Services:</h3>
                        <div className="list-group">
                            {presentableAwsServices.map(awsService => (
                                <Link
                                key={awsService.namespace}
                                to={`/${awsService.namespace}`}
                                className={"list-group-item list-group-item-action align-middle" + (!awsService.accessible ? " disabled ": "")}>
                                    {awsService.title}
                                </Link>
                            ))}
                        </div>
                    </div>
                }
            </div>
        );
    }
}

function mapState(state) {
    const { authentication } = state;
    const { user } = authentication;
    return { user };
}

const actionCreators = {
}

const connectedSqsPage = connect(mapState, actionCreators)(SqsPage);
export { connectedSqsPage as SqsPage };