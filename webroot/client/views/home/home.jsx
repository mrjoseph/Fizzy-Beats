import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { Link } from 'react-router-dom';
import { GET_USERS_QUERY, GET_ALL_USERS } from '../../graphql/queries/queries';
import cdn from '../../constants';
import { ProfileImage } from './home.styles';
import './home.css';
import withAuth from '../../AuthService/withAuth';

class Home extends Component {
  render() {
    const { profiles } = this.props.profileList;
    const { profileId, error, loading } = this.props.data;
    if( error ) return <div> error</div>
    if( loading ) return <div> loading...</div>
    if ( profileId ){
      const { username } = profileId;
      return(
      <div className="container">
     <div>
     {username}
     </div>
     <div className="row">
     {profiles && profiles.map(({ username, id, profileUsername, profileImage }) => {
       const profileImageURL = `${cdn}/static/${id}${profileImage}`;
       console.log(profileImageURL);
        return (
        <div key={id} className="col-sm-6 col-md-3 col px-md-2">
        <div className="card">
        <div className="card-body">
            <div className="card-title">
              <Link to={profileUsername}>{username}</Link>
             <ProfileImage>
             <img src={profileImageURL} alt="" />
             </ProfileImage>
            </div>
          </div>
        </div>
        </div>)
      })}
     </div>
    </div>
      )
    }
  
    return (<div className="container">welcome to Fizzy Beats</div>)
  }
}

export default withAuth(compose(
  graphql(GET_ALL_USERS, {name: 'profileList' }),
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
)(Home));