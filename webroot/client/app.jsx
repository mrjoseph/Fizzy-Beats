import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Home from './views/home/home';
import User from './views/user/user';
import About from './views/about/about';
import Register from './views/register';
import Profile from './views/profile/Profile';
import NotFound from './views/not-found/not-found';
import Header from './components/header/header';
import Login from './views/login/Login';
import './main.css';
import './bootstrap.min.css';


class App extends Component {
  render() {
    const { history } = this.props;
    return (
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
  }
}

export default withRouter(App);
