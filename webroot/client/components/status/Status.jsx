import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { GET_USERS_QUERY } from '../../graphql/queries/queries';

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

Status.propTypes = {
  data: PropTypes.objectOf(PropTypes.string).isRequired,
}
export default graphql(GET_USERS_QUERY, {
  options: props => ({
    variables: {
      username: props.username,
    },
  }),
})(Status);
