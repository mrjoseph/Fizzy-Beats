import React, { Component } from 'react';

class About extends Component {
  render() {
    console.log('about', this.props)
    return (
      <div>
        <h1>
          About my app...
        </h1>
      </div>
    );
  }
}

export default About;
