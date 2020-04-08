import React, { Component } from 'react';
import { AudioPlayerStyled } from './audio-player.styles';
const WaveSurfer = (typeof window !== 'undefined') && require('wavesurfer');

class AudioPlayer extends Component {
    constructor() {
      super();
     this.state = { toggle: false }
    }
    createWave(){
      const aud = document.querySelector('#song');
      const wave = document.querySelector('#waveform wave');
      if(wave){
        wave.parentNode.removeChild(wave);
      }  
      const linGrad = document.createElement('canvas').getContext('2d').createLinearGradient(0,155, 0,0);
      //bottom
      linGrad.addColorStop(0, '#e9ecef');
      linGrad.addColorStop(.3, '#e9ecef');
      linGrad.addColorStop(.5, '#bfddfb');
  
      //top
      linGrad.addColorStop(.5, '#92c4f7');
      linGrad.addColorStop(1, '#92c4f7');
  
      const postGrad = document.createElement('canvas').getContext('2d').createLinearGradient(0,155, 0,0);
      //top colour
      postGrad.addColorStop(0, '#e9ecef');
      postGrad.addColorStop(.3, '#e9ecef');
      postGrad.addColorStop(.5, '#bfddfb');
  
      //bottom colour
      postGrad.addColorStop(.5, '#477db3');
      postGrad.addColorStop(1, '#e9ecef');
  
      this.wavesurfer = WaveSurfer.create({
        barWidth: 4,
        cursorWidth: 2,
        container: '#waveform',
        backend: 'MediaElement',
        height: 80,
        progressColor: postGrad,
        responsive: true,
        waveColor: linGrad ,
        cursorColor: '#4a74a5',
      });
      
      this.wavesurfer.load(aud);
      this.wavesurfer.play();
      this.setState({ toggle: false });
      
    } 
    componentDidMount() { 
      this.createWave()
    }

    componentDidUpdate(nextProps) {
      if(this.props.name !== nextProps.name) {
        this.forceUpdate(() => {
          this.createWave()
        });  
      }
    }
  
    playIt = async () => {  
      this.wavesurfer.playPause();
      this.setState({ toggle: !this.state.toggle });
    };
  
    stopIt = () => {
      this.wavesurfer.stop();
    }
  
    render(){
      const { userId, name } = this.props;
      const filePath =`http://localhost:3003/static/${userId}/${name}`;
      const styleDiv = { 
        width: 500, 
        height: 80 ,
      }
    
      return(
        <AudioPlayerStyled>
        <div> {name}</div>
           <div style={styleDiv} id="waveform" />
           <audio id="song" src={filePath} />
           <div>
           <button onClick={this.playIt} className="btn btn-dark">
           <i className={`fas fa-${ this.state.toggle ? 'play' : 'pause'}`}></i>
           </button>
           <button onClick={this.stopIt} className="btn btn-dark">
           <i className={`fas fa-stop`}></i>
           </button>
         </div>
       </AudioPlayerStyled>
      )
    }
  }

export default AudioPlayer;