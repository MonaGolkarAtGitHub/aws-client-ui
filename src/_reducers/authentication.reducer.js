import { userConstants } from '../_constants';

const initialState = {
    loggingIn: false,
    loggedIn: false,
    user: null,
    accessKey: '',
    secret: ''
};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
        return {
            ...state,
            ...initialState,
            loggingIn: true,
        };
    case userConstants.LOGIN_SUCCESS:
        return {
            ...state,
            loggingIn: false,
            loggedIn: true,
            user: action.user,
            accessKey: action.accessKey,
            secret: action.secret
        };
    case userConstants.LOGIN_FAILURE:
        return {
            ...initialState
        };
    case userConstants.LOGOUT:
        return {
            ...initialState
        };
    default:
        return state
  }
}