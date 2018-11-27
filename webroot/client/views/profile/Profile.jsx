import React, { Component } from 'react';
import withAuth from '../../AuthService/withAuth';

class Profile extends Component {
  render() {
    return (
      <div>
        <h1>
          Profile...
        </h1>
      </div>
    );
  }
}

Profile.propTypes = {};

Profile.defaultProps = {
  pathname: '',
};
export default withAuth(Profile);
