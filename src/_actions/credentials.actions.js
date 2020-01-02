import { credentialsConstants } from '../_constants';
import { alertActions, userActions } from './';

export const credentialsActions = {
    processCredentialFile,
    selectCredentialProfile,
    wipeProfiles
};

function processCredentialFile(credentialFileContent) {
    return dispatch => {
        dispatch(loading());

        let credentialsSet = [];
        let parsedContent = [...credentialFileContent.matchAll(/(\[[^\]]+\]\s)*aws_access_key_id=\S+\saws_secret_access_key=\S+\s*/gi)].map(function(v, i, a){
            return v[0].split("\n").filter(Boolean);
        });

        parsedContent.forEach(function(element) {
            if (element && Array.isArray(element) && ((parsedContent.length == 1 && element.length == 2) || element.length == 3)) {
                let profile = (element.length == 2) ? 'default' : element[0].replace(/\[|\]/gm, "");
                let index = (element.length == 3) ? 1 : 0;
                let accessKey = element[index].split("=")[1];
                let secret = element[index+1].split("=")[1];

                if (profile && accessKey && secret) {
                    credentialsSet.push({'profile': profile, 'accessKey': accessKey, 'secret': secret});
                }
            }
        });

        dispatch(loaded(credentialsSet));
    };

    function loading() { return { type: credentialsConstants.CREDENTIALS_LOAD_START} }
    function loaded(credentialsSet) { return { type: credentialsConstants.CREDENTIALS_LOAD_FINISH, credentialsSet: credentialsSet } }
}

function selectCredentialProfile (credentialsSet, selectedProfileName) {
    let selectedCredentialSet = credentialsSet.filter(function(credential){
        return credential.profile == selectedProfileName;
    });

    if (!selectedCredentialSet || !selectedCredentialSet.length){
        dispatch(alertActions.error("Credential profile could not be found"));
    }

    if (selectedCredentialSet.length > 1){
        dispatch(alertActions.error("Multiple credential profiles matched the selected profile"));
    }

    return dispatch => {
        dispatch({ type: credentialsConstants.SELECT_CREDENTIAL_SET, selectedCredentialSet: selectedCredentialSet[0] });
        dispatch(userActions.login(selectedCredentialSet[0].accessKey, selectedCredentialSet[0].secret));
    };
}

function wipeProfiles() {
    return dispatch => dispatch({ type: credentialsConstants.CREDENTIALS_UNLOAD });
}
