import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql, compose, Query } from 'react-apollo';
import { GET_USERS_QUERY } from '../../graphql/queries/queries';
import './home.css';
import withAuth from '../../AuthService/withAuth';
import Images from '../../components/images/images';
// import { Container, Title, Box } from './home.styles';
const logErrorToMyService = (error, info) => {
  console.log(error, info);
}
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
}

class Home extends Component {
  render() {
    return( 
      <ErrorBoundary><Images userId={this.props.user.id}/></ErrorBoundary> 
    );
  }
}

export default withAuth(compose(
  graphql(GET_USERS_QUERY, {
    options: props => ({
      name: 'userData',
      variables: {
        id: props.user && props.user.id,
      },
    }),
  })
)(Home));