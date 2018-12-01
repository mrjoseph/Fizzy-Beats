import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, withRouter } from 'react-router-dom';
import Home from './views/home/home';
import User from './views/user/user';
import About from './views/about/about';
import Register from './views/register/Register';
import Profile from './views/profile/Profile';
import NotFound from './views/not-found/not-found';
import Header from './components/header/header';
import Login from './views/login/Login';

import './bootstrap.min.css';
import './main.css';

const App = ({ history }) => (
  <div>
    <Header history={history} />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <Route exact path="/user" component={User} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/login" component={Login} />
      <Route component={NotFound} />
    </Switch>
    <footer>
        footer
    </footer>
  </div>
);
App.propTypes = {
  history: PropTypes.shape([
    PropTypes.string,
    PropTypes.number,
    PropTypes.func,
  ]).isRequired,
};
export default withRouter(App);
