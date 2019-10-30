import React from 'react';
import { Link } from 'react-router-dom';

export const AuthenticatedHeader = ({ loggedInUser }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light w-100">
            <div className="d-flex align-items-center">
                <span className="font-weight-bold">Logged in as:</span> <span className="mx-2">{loggedInUser.UserName}</span>
                <Link className="mx-4 btn btn-sm btn-secondary" to="/login" role="button">Logout</Link>
            </div>
        </nav>
    );
}