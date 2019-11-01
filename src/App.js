import React, { Component } from 'react';
import Header from './component/Header'
import Photo from './component/Photo'
import Video from './component/Video'
import './App.css'

let facing = "user"
var isMoblie = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
let constraints = {
  video: { facingMode: 'user' },
  audio: false
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.buttonTurn = document.getElementById('turn');
  }


  handleCameraChange = () => {
    if (isMoblie)
      if (facing === 'user') {
        facing = 'environment'
        constraints = { audio: false, video: { facingMode: { exact: "environment" } } }
      }
      else {
        facing = 'user'
        constraints = { audio: false, video: { facingMode: "user" } }
      }
    else
      console.log('Isn\'t molibe ');

    this.buttonTurn.click();
    this.buttonTurn.click();
  }

  render() {
    return (
      <div >
        <Header handleCameraChange={this.handleCameraChange} />
        <Video facing={facing} constraints={constraints} />
      </div>
    );
  }
}

export default App;