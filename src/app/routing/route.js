import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import ProtectedRoute from './protectedRoute';
import Main from 'mainComponents/main';
import Login from 'mainComponents/login';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from './mapping';

class Routing extends Component {
  constructor(props) {
    super(props);
    const { addUser } = props;
    const user = localStorage.getItem('user');
    if (user) {
      addUser(JSON.parse(user));
    }
  }

  render() {
    return (
      <Router>
        <Switch>
          <ProtectedRoute path="/" component={Main} />
          <Route path="/login" component={Login} />
          <ProtectedRoute path='/admin' component={Admin}/>
        </Switch>
      </Router>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Routing)