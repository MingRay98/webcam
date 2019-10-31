import React, { Component } from 'react';
import '../App.css'

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className='header'>
        <button className='headerBtn' >++</button>
        Webcam
       <button className='headerBtn' onClick={this.props.handleCameraChange} >turn</button>
      </div>
    );
  }
}

export default Header;