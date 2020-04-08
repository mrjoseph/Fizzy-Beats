import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { graphql, compose } from 'react-apollo';

import  AudioPlayer from '../audio-player';
import withAuth from '../../AuthService/withAuth';
import { PLAY_AUDIO } from '../../graphql/queries/queries';


// const Footer = ({ audioData, error, loading }) => {
//     if(error) return <div> error</div>
//     if(loading) return <div>loading...</div>
//     if(audioData.audio){
//       const { audio } = audioData;
//       return( 
//       <footer>
//       {audio.userId && <AudioPlayer userId={audio.userId} name={audio.name} />}

//       </footer>);
//     } 
//     return null;
// }

// export default withRouter(withAuth(compose(
//     graphql(PLAY_AUDIO, {
//       name: 'audioData',
//     })
//   )(Footer)));

const Footer = () => <div>Footer</div>
export default Footer;