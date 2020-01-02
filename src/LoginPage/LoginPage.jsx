import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormText, ListGroup, ListGroupItem, Button } from 'reactstrap';

import { userActions, credentialsActions } from '../_actions';
import { LoadingSpinner, NotFoundWrapper } from '../_components';

class LoginPage extends Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.logout();

        this.state = {
            accessKey: '',
            secret: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFileLoading = this.handleFileLoading.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { loggedIn } = this.props;
        const { accessKey, secret } = this.state;

        if (accessKey && secret && !loggedIn) {
            this.props.login(accessKey, secret);
        }
    }

    handleFileLoading(e) {
        if (!e.target || !e.target.files) {
            return;
        }

        const fileList = event.target.files;
        const inputFile = fileList.item(fileList.length - 1);
        if (!inputFile || inputFile.size > 100000) {
            return;
        }

        let reader = new FileReader();
        reader.onloadend = event => {
            this.props.processCredentialFile(event.target.result);
        }
        reader.readAsText(inputFile)
    }

    renderCredentialOptions() {
        const { credentialsLoading, credentialsLoaded, credentialsSet, selectedCredentialSet, selectCredentialProfile, wipeProfiles } = this.props;

        if (!credentialsLoading && !credentialsLoaded) {
            return;
        }

        if (credentialsLoading) {
            return <LoadingSpinner />
        }

        if (credentialsLoaded && (!credentialsSet || !credentialsSet.length)) {
            return <NotFoundWrapper message='No Credentials Could be Extracted!' />
        }

        return (
            <div>
                <ListGroup id='credentialsList'>
                    {credentialsSet.map((credential, index) => (
                        <ListGroupItem tag='button' key={'profile' + index} action
                            className={ selectedCredentialSet && (credential.profile == selectedCredentialSet.profile) ? ' active' : ''}
                            onClick={() => selectCredentialProfile(this.props.credentialsSet, credential.profile)}
                        >
                            {credential.profile}
                        </ListGroupItem>
                    ))}
                </ListGroup>
                <Button key='wiper' className='mt-2' size='sm' color='secondary' onClick={() => wipeProfiles()} > Clear Credentials </Button>
            </div>
        )
    }

    render() {
        const { loggingIn, credentialsLoaded, credentialsSet } = this.props;
        const { accessKey, secret, submitted } = this.state;
        return (
            <div className='col-md-4 offset-md-3'>
                <h2>Login</h2>
                <form name='formTextInputs' onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !accessKey ? ' has-error' : '')}>
                        <label htmlFor='accessKey'>Access Key ID</label>
                        <input type='text' className='form-control' name='accessKey' value={accessKey} onChange={this.handleChange} />
                        {submitted && !accessKey &&
                            <div className='help-block'>Access Key ID is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !secret ? ' has-error' : '')}>
                        <label htmlFor='secret'>Secret Access Key</label>
                        <input type='password' className='form-control' name='secret' value={secret} onChange={this.handleChange} />
                        {submitted && !secret &&
                            <div className='help-block'>Secret Access Key is required</div>
                        }
                    </div>
                    <div className='form-group'>
                        <button className='btn btn-primary'>Login</button>
                        {loggingIn &&
                            <img src='data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==' />
                        }
                    </div>

                    <h3 className="pt-3">Or use Credential File</h3>
                    <div className={'form-group' + (credentialsLoaded && (!credentialsSet || !credentialsSet.length) ? ' has-error' : '')}>
                        <input type='file' name='credentialFile' id='credentialFile' onChange={this.handleFileLoading}/>
                        <FormText color="muted">
                        Select your AWS Credential file (~/.aws/credentials)
                        </FormText>
                        {this.renderCredentialOptions()}
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { authentication, credentials } = state;
    const { loggingIn, loggedIn } = authentication;
    const { credentialsLoading, credentialsLoaded, credentialsSet, selectedCredentialSet, selectCredentialProfile } = credentials;
    return { loggingIn, loggedIn, credentialsLoading, credentialsLoaded, credentialsSet, selectedCredentialSet, selectCredentialProfile };
}

const mapActionsToProps = {
    login: userActions.login,
    logout: userActions.logout,
    processCredentialFile: credentialsActions.processCredentialFile,
    selectCredentialProfile: credentialsActions.selectCredentialProfile,
    wipeProfiles: credentialsActions.wipeProfiles
};

const connectedLoginPage = connect(mapStateToProps, mapActionsToProps)(LoginPage);
export { connectedLoginPage as LoginPage };