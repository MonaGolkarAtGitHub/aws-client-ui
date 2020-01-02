import { credentialsConstants } from '../_constants';

const initialState = {
    credentialsLoading: false,
    credentialsLoaded: false,
    credentialsSet: [],
    selectedCredentialSet: null
};

export function credentials(state = initialState, action) {
  switch (action.type) {
    case credentialsConstants.CREDENTIALS_LOAD_START:
        return {
            ...initialState,
            credentialsLoading: true
        };
    case credentialsConstants.CREDENTIALS_LOAD_FINISH:
        return {
            ...state,
            credentialsLoading: false,
            credentialsLoaded: true,
            credentialsSet: action.credentialsSet
        };
    case credentialsConstants.SELECT_CREDENTIAL_SET:
        return {
            ...state,
            selectedCredentialSet: action.selectedCredentialSet
        };
    case credentialsConstants.CREDENTIALS_UNLOAD:
        return {
            ...initialState
        };
    default:
        return state
  }
}