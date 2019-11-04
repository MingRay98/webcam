import React, { Component } from 'react';
import '../App.css'

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleOnclick = (e) => {
    const styleSelect = document.getElementById('youStyle');
    let temp = {
      target: {
        value: styleSelect.options[styleSelect.options.selectedIndex].value
      }
    }
    if (e.target.innerHTML === '+') {
      this.props.add(temp)
    }
    else {
      this.props.minus(temp)
    }

  }

  init = () => {
    if (window.isMobile)
      return (
        <div className='header'>
          <div style={{ width: "40%" }}>
            <button className='headerBtn' onClick={this.handleOnclick} style={{ width: "1rem", padding: '0px' }}>+</button>
            <select id="youStyle" style={{ width: "50%" }} >
              <option value="blur">Blur</option>
              <option value="grayscale">Grayscale</option>
              <option value="contrast">Contrast</option>
              <option value="brightness">Brightness</option>
            </select>
            <button className='headerBtn' onClick={this.handleOnclick} style={{ width: "1rem", padding: '0px' }}>-</button>
          </div>
          Webcam
        < button className='headerBtn' onClick={this.props.handleCameraChange} > turn</button >
        </div>)
    else
      return (
        <div className='header' style={{ justifyContent: 'center' }}>
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