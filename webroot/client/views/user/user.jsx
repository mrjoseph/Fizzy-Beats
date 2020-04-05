import React, { Component } from 'react';
import { Jumbotron } from './user.styles';
import PlayerControls from '../../components/player-controls/player-controls';


class User extends Component {
  componentDidMount() {
    this.props.data.refetch();
  }

  render() {
    const { profile, error, loading } = this.props.data;
    if( error ) return <div> error</div>
    if( loading ) return <div> loading...</div>
    if ( profile ){
  
      const { id: userId, username, assets, profileImage } = profile;
      const assetsId = assets.map(({ id }) => id);
      return(
        <div className="container">
          <Jumbotron className="jumbotron">
            <h1 className="display-4"> {username}</h1>
            
              <div className="jumbo-image">
                <img src={`http://localhost:3003/static/${userId}${profileImage}`} alt="username" />
            
            </div>
          </Jumbotron>
       
          <div className="row">
            {assets.map(({ file, id, status },index,array) => {

              const { name, size, type } = file;
              return(
              <div className="col-6 col-md-4" key={id}>
              
                <div className="alert alert-light">
                  <div className="card-body">
                  <p className="card-text font-weight-lighter">{name}</p>      
              </div>
              <div>
                <PlayerControls 
                status={status} 
                userId={userId} 
                name={name} 
                id={id} 
                index={index} 
                assetsId={assetsId} 
                />
              </div>
                </div>
              </div>       
              )
            })}
          </div>
        </div>
      )
    }
    return (<div className="container">User profile not found</div>)
  }
}
export default User;