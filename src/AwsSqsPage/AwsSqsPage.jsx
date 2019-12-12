import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { awsConstants } from '../_constants';
import { AuthenticatedHeader } from '../_helpers'

class SqsPage extends Component {
    render() {
        return (
            <div className="w-100">
                SQS Page
            </div>
        );
    }
}

const connectedSqsPage = connect()(SqsPage);
export { connectedSqsPage as SqsPage };