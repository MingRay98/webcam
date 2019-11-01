import React, { Component } from 'react';
import Header from './component/Header'
import Photo from './component/Photo'
import Video from './component/Video'
import './App.css'

let facing = "user"
var isMoblie = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //增加constrans 來改
      constraints: {
        video: { facingMode: "user" },
        audio: false
      },
    };
  }

  handleCameraChange = () => {
    if (isMoblie)
      if (facing === 'user') {
        facing = 'environment'
        this.setState({ constraints: { audio: true, video: { facingMode: { exact: "environment" } } } })
      }
      else {
        facing = 'user'
        this.setState({ constraints: { audio: true, video: { facingMode: "user" } } })
      }
    else
      console.log('Isn\'t molibe ');
  }

  render() {
    return (
      <div >
        <Header handleCameraChange={this.handleCameraChange} />
        <Video facing={facing} constraints={this.state.constraints} />
      </div>
    );
  }
}

export default App;