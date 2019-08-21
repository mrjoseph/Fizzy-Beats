import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import withAuth from '../../AuthService/withAuth';
import { Title } from '../../styledComponents/index.styles';
import { GET_USERS_QUERY } from '../../graphql/queries/queries';
import S3Uploader from '../../components/form/s3Uploader';

class Profile extends Component {
  render() {
    const { data, user } = this.props;
    if (data.loading) return 'Loading...';
    if (data.error) return 'Error...';
  
    const { id: userId } = user;
    return (
      <div className="container">
        <S3Uploader userId={userId} />
 
      </div>
    );
  }
}

Profile.propTypes = {};

Profile.defaultProps = {
  pathname: '',
};

export default withAuth(graphql(GET_USERS_QUERY, {
  options: props => ({
    name: 'userData',
    variables: {
      id: props.user && props.user.id,
    },
  }),
})(Profile));
