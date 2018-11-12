import React, { Component } from 'react';
import img from './images/2013-12-18.jpg';
class Header extends Component {
  render (){
    return (
      <header>
        <img src={img} width="100" height="50" />
      </header>
    )
  }
}

export default Header;