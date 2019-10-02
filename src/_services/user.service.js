import config from 'config';
import { awsAccessService } from './';

export const userService = {
    login,
    logout,
    getUserAccessibleServices
};

function login(accessKey, secret) {
    awsAccessService.setup(accessKey, secret)
    return awsAccessService.getIamUser();
/*    return new Promise((resolve, reject) => {
        if (result.authenticated) {
            const user = result.user;
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));

            return resolve(user);
        }

        return reject(result.error);
    }); */
}

function getUserAccessibleServices(user) {
    return awsAccessService.getListGroupsForIAMUser(user.UserName);
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}
