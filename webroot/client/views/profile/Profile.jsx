import React, { Component } from 'react';
import withAuth from '../../AuthService/withAuth';
import { Title } from '../../styledComponents/index.styles';

class Profile extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <Title>Profile</Title>
        <div className="container">
          <div><b>Username:</b> {this.props.user.username}</div>
          <div><b>email:</b> {this.props.user.email}</div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {};

Profile.defaultProps = {
  pathname: '',
};
export default withAuth(Profile);
