import React, { Component } from 'react';

class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <input type="range" min="0.5" max="1.5" step="0.1" defaultValue="1" id="slider" className="slider"
          onChange={this.props.moveSlide} style={{ width: this.props.width - 10, height: '1rem' }} /><br />
        <button id='turn' onClick={this.props.handleTurnStream}>turn Off</button>
        <button onClick={this.props.takePhoto}>take photo</button>
        <button id='savePhoto' style={{ display: 'none' }} onClick={this.props.downloadCanvasIamge}>save photo</button>
        <a id='downloadImg'></a>
      </div>
    );
  }
}

export default Slider;