import { graphql, compose } from 'react-apollo';
import { GET_TEXT_COLOR, GET_TOGGLE_AUDIO_QUERY,  } from '../../graphql/queries/queries';
import AudioPlayer from './audio-player';


export default compose(
    graphql(GET_TEXT_COLOR, {
        name: 'textColor',
      }),
    graphql(GET_TOGGLE_AUDIO_QUERY, {name: "toggleState"}),
    // graphql(TOGGLE_AUDIO_MUTATION, {
    //     name: "toggleAudio",
    //     options: ({ toggleState }) => 
    //         ({
    //             variables: toggleState.toggleAudio 
    //         })
        
    // }),
)(AudioPlayer);