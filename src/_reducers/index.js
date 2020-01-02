import { combineReducers } from 'redux';

import { credentials } from './credentials.reducer';
import { authentication } from './authentication.reducer';
import { userAccess } from './userAccess.reducer';
import { awsServices } from './awsServices.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
    credentials,
    authentication,
    userAccess,
    awsServices,
    alert
});

export default rootReducer;