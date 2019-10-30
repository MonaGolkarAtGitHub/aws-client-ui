import config from 'config';
import { awsAccessService } from './';
import { awsConstants } from '../_constants';

export const userService = {
    login,
    logout,
    getUserAccessibleServices
};

function login(accessKey, secret) {
    awsAccessService.setup(accessKey, secret);

    return awsAccessService.getIamUser();
}

function getUserAccessibleServices(user) {
    var presentableAwsServices = awsConstants.SERVICES.filter(awsService => awsService.presentable).map((settings,index) => { return settings.namespace });

    return awsAccessService.getListPoliciesGrantingServiceAccess(user.Arn, presentableAwsServices);
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}
