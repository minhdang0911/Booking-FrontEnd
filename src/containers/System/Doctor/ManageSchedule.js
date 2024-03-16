import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../Header/Header';
import { Redirect, Route, Switch } from 'react-router-dom';

class ManageSchedule extends Component {
    render() {
        const { isLoggedIn } = this.props;
        return (
            <React.Fragment>
                {/* {isLoggedIn && <Header />} */}
                <div>Test</div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
