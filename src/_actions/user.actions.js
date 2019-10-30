import { userConstants } from '../_constants';
import { userService, awsAccessService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout,
    getAccessibleServices
};

function login(accessKey, secret) {
    return dispatch => {
        dispatch(request());

        userService.login(accessKey, secret)
        .then(
            user => {
                localStorage.setItem('user', JSON.stringify(user));
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                dispatch(success(user, accessKey, secret));
                history.push('/');
            },
            error => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        );
    };

    function request() { return { type: userConstants.LOGIN_REQUEST } }
    function success(user, accessKey, secret) { return { type: userConstants.LOGIN_SUCCESS, user, accessKey, secret } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function getAccessibleServices(user) {
    return dispatch => {
        dispatch(request());

        userService.getUserAccessibleServices(user)
        .then(
            servicesPolicies => {
                var accessibleServices =
                    servicesPolicies.filter(
                        servicePolicies => servicePolicies.Policies.length > 0
                    ).map(servicePolicies => {
                        return awsAccessService.getConstantsForAwsService(servicePolicies.ServiceNamespace)
                    });
                dispatch(success(accessibleServices));
            },
            error => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        );
    };

    function request() { return { type: userConstants.SERVICE_LIST_REQUEST } }
    function success(accessibleServices) { return { type: userConstants.SERVICE_LIST_SUCCESS, services: accessibleServices } }
    function failure(error) { return { type: userConstants.SERVICE_LIST_FAILURE, error } }
}

function logout() {
    userService.logout();
    return dispatch => dispatch({ type: userConstants.LOGOUT });
}
