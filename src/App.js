import React, { Component } from 'react';
import Header from './component/Header'
import Fliter from './component/Fliter'
import Video from './component/Video'
import './App.css'

let facing = "user"
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
window.isMobile = isMobile;
let blur = 0, grayscale = 0, contrast = 1, brightness = 1

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blur: 'blur(0px)',
      grayscale: 'grayscale(0%)',
      contrast: 'contrast(1)',
      brightness: 'brightness(1)',
    }

    this.constraints = {
      video: { facingMode: 'user', width: { exact: 1920 }, height: { exact: 1080 } },
      audio: false
    }
  }

  componentDidMount() {
    this.buttonTurn = document.getElementById('turn');
  }

  handleCameraChange = () => {

    if (isMobile)
      if (facing === 'user') {
        facing = 'environment'
        this.setState({ constraints: { audio: false, video: { facingMode: 'environment', width: { exact: 1920 }, height: { exact: 1080 } } } }, () => {
          this.buttonTurn.click();
          this.buttonTurn.click();
        });
        document.getElementById('videoCanvas').className = ''
      }
      else {
        facing = 'user'
        this.setState({ constraints: { audio: false, video: { facingMode: "user", width: { exact: 1920 }, height: { exact: 1080 } } } }, () => {
          this.buttonTurn.click();
          this.buttonTurn.click();
        });
        document.getElementById('videoCanvas').className = 'Stream'
      }
    else
      console.log('Isn\'t molibe ');

  }

  addFliter = (e) => {
    const type = e.target.value;
    switch (type) {
      case 'blur':
        blur = blur + 1;
        this.setState({ blur: "blur(" + blur + "px)" })
        break;
      case 'grayscale':
        grayscale = grayscale + 10;
        this.setState({ grayscale: "grayscale(" + grayscale + "%)" })
        break;
      case 'contrast':
        contrast = contrast + 1;
        this.setState({ contrast: "contrast(" + contrast + ")" })
        break;
      case 'brightness':
        if (brightness >= 2) return;
        brightness = brightness + 0.1;
        this.setState({ brightness: "brightness(" + brightness.toFixed(1) + ")" })
        break;
      default:
        break;
    }
  }
  minusFliter = (e) => {
    const type = e.target.value;
    switch (type) {
      case 'blur':
        if (blur <= 0) return;
        blur = blur - 1;
        this.setState({ blur: "blur(" + blur + "px)" })
        break;
      case 'grayscale':
        if (grayscale <= 0) return;
        grayscale = grayscale - 10;
        this.setState({ grayscale: "grayscale(" + grayscale + "%)" })
        break;
      case 'contrast':
        if (contrast <= 1) return;
        contrast = contrast - 1;
        this.setState({ contrast: "contrast(" + contrast + ")" })
        break;
      case 'brightness':
        if (brightness <= 0.11) return;
        brightness = brightness - 0.1;
        this.setState({ brightness: "brightness(" + brightness.toFixed(1) + ")" })
        break;
      default:
        break;
    }
  }

  moblieORdestop = () => {

    let filterStyle = {
      blur: this.state.blur,
      grayscale: this.state.grayscale,
      contrast: this.state.contrast,
      brightness: this.state.brightness
    }

    if (!isMobile) {
      return (
        <div style={{ display: "flex" }}>
          <div style={{ width: "60vw" }}>
            <Video facing={facing} constraints={this.constraints} filterStyle={filterStyle} />
          </div>
          <Fliter addFliter={this.addFliter}
            minusFliter={this.minusFliter}
            filterStyle={filterStyle} />
        </div>
      )
    } else {
      return <Video facing={facing} constraints={this.constraints} filterStyle={filterStyle} />
    }
  }

  render() {
    return (
      <div >
        <Header handleCameraChange={this.handleCameraChange} add={this.addFliter} minus={this.minusFliter} />
        {this.moblieORdestop()}
      </div>
    );
  }
}

export default App;