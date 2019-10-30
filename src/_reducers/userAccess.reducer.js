import { userConstants } from '../_constants';

const initialState = {loadingServicesSettings: false, accessibleServices: null};

export function userAccess(state = initialState, action) {
    switch (action.type) {
        case userConstants.SERVICE_LIST_REQUEST:
            return {
                ...state,
                ...initialState,
                loadingServicesSettings: true
            };
        case userConstants.SERVICE_LIST_SUCCESS:
            return {
                ...state,
                loadingServicesSettings: false,
                accessibleServices: action.services
            };
        case userConstants.SERVICE_LIST_FAILURE:
            return {
                ...state,
                initialState
            };
        default:
            return state
    }
}