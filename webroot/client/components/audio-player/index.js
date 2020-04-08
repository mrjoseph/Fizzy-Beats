import { graphql, compose } from 'react-apollo';
import { GET_TEXT_COLOR, GET_TOGGLE_AUDIO_QUERY,  } from '../../graphql/queries/queries';
import AudioPlayer from './audio-player';


export default compose(

    graphql(GET_TOGGLE_AUDIO_QUERY, {name: "toggleState"}),
)(AudioPlayer);