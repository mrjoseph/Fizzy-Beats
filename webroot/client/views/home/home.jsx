import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import cdn from '../../constants';
import { ProfileImage } from './home.styles';
import './home.css';
import withAuth from '../../AuthService/withAuth';

const Home = ({ profileList:{ profiles, loading, error}, user }) => {
  if(loading) return(<div>...loading</div>)
  if( error ) return <div> error</div>
  return ( <div className="container">
     <div className="row">
      {profiles && profiles.map(({ username, id, profileUsername, profileImage }) => {
       const profileImageURL = `${cdn}/static/${id}${profileImage}`;
    
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
  </div>)
};

export default withAuth((Home));