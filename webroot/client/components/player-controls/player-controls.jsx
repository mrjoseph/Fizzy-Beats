import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import { PlayerControlsStyled } from './player-controls.styles';
import { PLAY_AUDIO_MUTATION } from '../../graphql/queries/queries';
class PlayerControls extends Component {
    play = async () => { 
        const { client:{mutate},userId, name, id } = this.props;   
        if(userId){
            await mutate({
                mutation: PLAY_AUDIO_MUTATION,
                variables: { userId, name, id } 
             })
         }
    }
    render(){
        return (
            <PlayerControlsStyled>
                <button onClick={this.play} className="btn btn-info">
                    <i className={`fas fa-play`}></i>
              </button>
            </PlayerControlsStyled>
        )
    }
}

export default withApollo(PlayerControls);


