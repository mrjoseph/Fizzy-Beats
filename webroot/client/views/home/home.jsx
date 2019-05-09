import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { GET_USERS_QUERY } from '../../graphql/queries/queries';
import './home.css';
import withAuth from '../../AuthService/withAuth';
// import { Container, Title, Box } from './home.styles';

class Home extends Component {
  render() {
    const { data: { profile, error, loading } } = this.props;
    if (error) return (<div>Error loading please refresh</div>);
    if (loading) return (<div>Error loading... </div>);
    const { username } = profile;
    return (
      <h1>
        {`Welcome ${username}`}
      </h1>
    );
  }
}

export default withAuth(graphql(GET_USERS_QUERY, {
  options: props => ({
    name: 'userData',
    variables: {
      id: props.user && props.user.id,
    },
  }),
})(Home));
