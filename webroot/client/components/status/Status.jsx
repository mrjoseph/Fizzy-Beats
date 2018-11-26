import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { GET_USER_QUERY } from '../../graphql/queries/queries';

class Status extends Component {
  render() {
    const { data } = this.props;
    if (data.user) {
      return (
        <div>
hello
          {data.user.username}
        </div>
      );
    }
    return null;
  }
}

export default graphql(GET_USER_QUERY, {
  options: props => ({
    variables: {
      username: props.username,
    },
  }),
})(Status);
