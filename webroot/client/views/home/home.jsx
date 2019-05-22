import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql, compose, Query } from 'react-apollo';
import { GET_USERS_QUERY } from '../../graphql/queries/queries';
import './home.css';
import withAuth from '../../AuthService/withAuth';
import Images from '../../components/images/images';
// import { Container, Title, Box } from './home.styles';

class Home extends Component {
  
  render() {
    return( 
<div><Images userId={this.props.user.id}/></div>
    );
  }
}

// export default withAuth(
//   graphql(GET_USERS_QUERY, {
//   options: props => ({
//     name: 'userData',
//     variables: {
//       id: props.user && props.user.id,
//     },
//   }),
// })(Home)
// );

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