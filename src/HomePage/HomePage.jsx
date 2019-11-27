import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { userActions } from '../_actions';
import {
    AuthenticatedHeader,
    LoadingSpinner,
    NotFoundWrapper
} from '../_components';

class HomePage extends Component {
    componentDidMount() {
        this.props.getUserAccessibleServices(this.props.user);
    }

    renderServices() {
        const { loadingServicesSettings, accessibleServices } = this.props;

        if (loadingServicesSettings) {
            return <LoadingSpinner />
        }

        if (!accessibleServices) {
            return <NotFoundWrapper message='No Accessible Services Found!' />
        }

        return (
            <div className='list-group'>
                {accessibleServices.map(awsService => (
                    <Link
                    key={awsService.namespace}
                    to={`/${awsService.namespace}`}
                    className={'list-group-item list-group-item-action align-middle' + (!awsService.accessible ? ' disabled ': '')}
                    >
                        {awsService.title}
                    </Link>
                ))}
            </div>
        )
    }

    render() {
        const { user } = this.props;

        return (
            <div className='w-100'>
                <AuthenticatedHeader loggedInUser={user} />
                <div className='col-md-6 col-md-offset-3 pt-2 pb-5 my-2 bg-light w-100'>
                    <h3 className='my-3'>AWS Services:</h3>
                    {this.renderServices()}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { authentication, userAccess } = state;
    const { user } = authentication;
    const { loadingServicesSettings, accessibleServices } = userAccess;

    return { user, loadingServicesSettings, accessibleServices };
}

const mapActionsToProps = {
    getUserAccessibleServices: userActions.getAccessibleServices
}

const connectedHomePage = connect(mapStateToProps, mapActionsToProps)(HomePage);
export { connectedHomePage as HomePage };