import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class HomePage extends React.Component {
    componentDidMount() {
//        this.props.getUsers();
    }

    handleDeleteUser(id) {
//        return (e) => this.props.deleteUser(id);
    }

    render() {
        const { user } = this.props;
        return (
            <div className="w-100">
                <nav className="navbar navbar-expand-lg navbar-light bg-light w-100">
                    <div className="d-flex align-items-center">
                        <span className="font-weight-bold">Logged in as:</span> <span className="mx-2">{user.UserName}</span>
                        <Link className="mx-4 btn btn-sm btn-secondary" to="/login" role="button">Logout</Link>
                    </div>
                </nav>
                <div className="col-md-6 col-md-offset-3 pt-2 pb-5 my-2 bg-light w-100">
                    <h3>AWS Services:</h3>
                </div>
            </div>
        );
    }
}

function mapState(state) {
    const { authentication } = state;
    const { user } = authentication;
    return { user };
}

const actionCreators = {
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };