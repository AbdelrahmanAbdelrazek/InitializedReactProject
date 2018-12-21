import Login from 'components/index';
import style from './style.less';
import React, { Component } from 'react';
import { withRouter } from "react-router";
import { fromPairs } from 'lodash';
import { mapStateToProps } from './mapping';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class LoginForm extends Component {
    render() {
        const { history: { location: { search } }, user } = this.props;
        const params = fromPairs(search.toLowerCase().substring(1).split('&').map(d => d.split('=')))
        return (
            user ?
                <Redirect to='/' /> :
                <Login className={style.login} {...params} />
        );
    }
}

export default withRouter(connect(mapStateToProps)(LoginForm));