import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { Route, Switch, withRouter } from 'react-router-dom';
import Home from './views/home/home';
import User from './views/user';
import About from './views/about/about';
import Register from './views/register/Register';
import Profile from './views/profile/Profile';
import MyAccount from './views/my-account';
import Upload from './views/upload/Upload';
import NotFound from './views/not-found/not-found';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Login from './views/login/Login';
import { GET_USERS_QUERY, GET_DEFAULTS_QUERY } from './graphql/queries/queries';
import withAuth from './AuthService/withAuth';
import './bootstrap.min.css';
import './main.css';



class App extends Component {
  // componentDidUpdate() {
  //   if(this.props.data) this.props.data.refetch();
  // }
  render() {
    const { history, data } = this.props;
  
    return (
      <div>
        <Header history={history} data={data} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/my-account" component={MyAccount} />
          <Route exact path="/about" component={About} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/upload" component={Upload} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/:id" component={User} />
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </div>
    )
  }
}
App.propTypes = {
  history: PropTypes.shape([
    PropTypes.string,
    PropTypes.number,
    PropTypes.func,
  ]).isRequired,
};


export default withRouter(withAuth(compose(
 
  graphql(GET_USERS_QUERY, {
    name: 'data',
    options: (props) => {
      return {
        variables: {
          id: props.user && props.user.id,
        },
      }
    },
  })
)(App)));
