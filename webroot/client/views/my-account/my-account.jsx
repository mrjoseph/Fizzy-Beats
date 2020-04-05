import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { GET_USERS_QUERY } from '../../graphql/queries/queries';
import withAuth from '../../AuthService/withAuth';
import ImageUploader from '../../components/form/imageUploader/imageUploader';
import { ProfileImage } from './my-account.styles';
class MyAccount extends Component {

  refetch = () => {
   this.props.data.refetch();
  }
  render() {
    const { data, user } = this.props;
    if (data.loading) return 'Loading...';
    if (data.error) return 'Error...';
    const { id: userId } = user;
    const { data: { profileId } } = this.props
    const { username, profileUsername, email, profileImage, defaults: { cdn } } = profileId;
    
    return (
      <div className="container">
        <h1>
          Welcome to My Account
        </h1>
        <div>
          Username <br />
          {username}
        </div>
        <div>
          email <br />
          {email}
        </div>
        <div>
          personal URL <br />
          {profileUsername}
        </div>
        <div>
          <ImageUploader userId={userId} profileImage={profileImage} refetch={this.refetch}/>
        </div>
      </div>
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
})(MyAccount));