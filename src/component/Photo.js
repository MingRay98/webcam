import React, { Component } from 'react';


class Photo extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  render() {
    return (
      <div>
        <canvas id='photoCanvas' className='Stream'/>
      </div>
    );
  }
}

export default Photo;