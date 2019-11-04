import React, { Component } from 'react';
import Header from './component/Header'
import Photo from './component/Photo'
import Video from './component/Video'
import './App.css'

let facing = "user"
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
window.isMobile = isMobile;
let videoinput_id = '';



let blur = 0

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoCanvasStyle: {
        filter: 'blur(0px)',
      },
      constraints : {
        video: { facingMode: 'user' },
        audio: false
      }
    };
  }

  componentDidMount() {
    this.buttonTurn = document.getElementById('turn');
  }





  handleCameraChange = () => {

    navigator.mediaDevices.enumerateDevices().then(function (devices) {
      devices = devices.filter(function (devices) { return devices.kind === 'videoinput'; });
      devices.forEach(function (device) {
        if (device.label.toLowerCase().search("back") > -1) {
          videoinput_id = device.deviceId;
        }
      })
    });

    if (isMobile)
      if (facing === 'user') {
        facing = 'environment'
        this.setState({constraints : { audio: false, video: { facingMode: 'environment' } }});
      }
      else {
        facing = 'user'
        this.setState({constraints : { audio: false, video: { facingMode: "user" } }});
      }
    else
      console.log('Isn\'t molibe ');

    this.buttonTurn.click();
    this.buttonTurn.click();
  }

  addBlur = () => {
    console.log(blur = blur + 1)
    this.setState({ videoCanvasStyle: { filter: "blur(" + blur + "px" + ")" } })
  }
  minusBlur = () => {
    console.log(blur = blur - 1)
    this.setState({ videoCanvasStyle: { filter: "blur(" + blur + "px" + ")" } })
  }

  desktopList = () => {

    if (!isMobile) {
      return (
        <div style={{ display: "flex" }}>
          <div style={{ width: "50vw" }}>
            <Video facing={facing} constraints={this.state.constraints} videoCanvasStyle={this.state.videoCanvasStyle} />
          </div>
          <div className="desktopList" style={{ width: "50vw" }}>

            <button onClick={this.addBlur}>++</button>
            blur:{this.state.videoCanvasStyle.filter}
            <button onClick={this.minusBlur}>--</button>
          </div>
        </div>
      )
    } else {
      return <Video facing={facing} constraints={this.state.constraints} />
    }
  }

  render() {
    return (
      <div >
        <Header handleCameraChange={this.handleCameraChange} />
        {this.desktopList()}
      </div>
    );
  }
}

export default App;