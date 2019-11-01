import React, { Component } from 'react';
import '../App.css'

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  init = () => {
    if (window.isMobile)
      return (
        <div className='header'>
          <button className='headerBtn'>++</button>
          Webcam
        < button className='headerBtn' onClick={this.props.handleCameraChange} > turn</button >
        </div>)
    else
      return (
        <div className='header' style={{justifyContent:'center'}}>
          Webcam
      </div>)
  }

  render() {
    return (
      <div >
        {this.init()}
      </div>
    );
  }
}

export default Header;