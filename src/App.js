import React, { Component } from 'react';
import Header from './component/Header'
import Photo from './component/Photo'
import Video from './component/Video'
import './App.css'

let facing = "user"
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
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
      constraints: {
        video: { facingMode: 'user' },
        audio: false
      }
    };
  }

  componentDidMount() {
    this.buttonTurn = document.getElementById('turn');
  }

  handleCameraChange = () => {

    if (isMobile)
      if (facing === 'user') {
        facing = 'environment'
        this.setState({ constraints: { audio: false, video: { facingMode: 'environment' } } },()=>{   this.buttonTurn.click();
          this.buttonTurn.click();});
      }
      else {
        facing = 'user'
        this.setState({ constraints: { audio: false, video: { facingMode: "user" } } },()=>{   this.buttonTurn.click();
          this.buttonTurn.click();});
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
        this.setState({ brightness: "brightness(" + brightness + ")" })
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
        this.setState({ brightness: "brightness(" + brightness + ")" })
        break;
      default:
        break;
    }
  }

  desktopList = () => {

    let filterStyle = {
      blur: this.state.blur,
      grayscale: this.state.grayscale,
      contrast: this.state.contrast,
      brightness: this.state.brightness
    }

    if (!isMobile) {
      return (
        <div style={{ display: "flex" }}>
          <div style={{ width: "50vw" }}>
            <Video facing={facing} constraints={this.state.constraints} filterStyle={filterStyle} />
          </div>
          <div className="desktopList" style={{ width: "50vw", display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ width: "100%", display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={this.addFliter} value='blur'>++</button>
              {this.state.blur}
              <button onClick={this.minusFliter} value='blur'>--</button>
            </div>
            <div style={{ width: "100%", display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={this.addFliter} value='grayscale'>++</button>
              {this.state.grayscale}
              <button onClick={this.minusFliter} value='grayscale'>--</button>
            </div>
            <div style={{ width: "100%", display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={this.addFliter} value='contrast'>++</button>
              {this.state.contrast}
              <button onClick={this.minusFliter} value='contrast'>--</button>
            </div>
            <div style={{ width: "100%", display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={this.addFliter} value='brightness'>++</button>
              {this.state.brightness}
              <button onClick={this.minusFliter} value='brightness'>--</button>
            </div>
          </div>
        </div>
      )
    } else {
      return <Video facing={facing} constraints={this.state.constraints} filterStyle={filterStyle} />
    }
  }

  render() {
    return (
      <div >
        <Header handleCameraChange={this.handleCameraChange} add={this.addFliter} minus={this.minusFliter} />
        {this.desktopList()}
      </div>
    );
  }
}

export default App;