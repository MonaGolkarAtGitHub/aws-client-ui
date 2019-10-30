import React from 'react';

export const NotFoundWrapper = ({ message }) => {
    message = message ? message : 'Not Found!';

    return (
        <div className="card">
            <div className="card-body">
                <div className="card-text text-danger">
                    {message}
                </div>
            </div>
        </div>
    );
}