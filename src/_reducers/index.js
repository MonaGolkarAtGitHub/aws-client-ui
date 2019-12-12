import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { userAccess } from './userAccess.reducer';
import { awsServices } from './awsServices.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
    authentication,
    userAccess,
    awsServices,
    alert
});

export default rootReducer;