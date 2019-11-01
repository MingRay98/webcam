import React, { Component } from 'react';
import Header from './component/Header'
import Photo from './component/Photo'
import Video from './component/Video'
import './App.css'

let facing = "user"
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
window.isMobile = isMobile;

let constraints = {
  video: { facingMode: 'user' },
  audio: false
}

let blur = 0

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoCanvasStyle:{
        filter: 'blur(0px)',
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

  addBlur = () => {
    console.log(blur = blur+1 )
    this.setState({videoCanvasStyle:{filter:"blur("+blur+"px"+")"}})
  }
  minusBlur = () => {
    console.log(blur = blur-1 )
    this.setState({videoCanvasStyle:{filter:"blur("+blur+"px"+")"}})
  }

  desktopList = () => {

    if (!isMobile) {
      return (
        <div style={{display:"flex"}}>
          <div style={{ width: "50vw" }}>
            <Video facing={facing} constraints={constraints} videoCanvasStyle={this.state.videoCanvasStyle} />
          </div>
          <div className="desktopList" style={{ width: "50vw" }}>
            
            <button onClick={this.addBlur }>++</button>
            blur:{this.state.videoCanvasStyle.filter}
            <button onClick={this.minusBlur}>--</button>
        </div>
        </div>
      )
    } else {
      return <Video facing={facing} constraints={constraints} />
    }
  }

  render() {
    return (
      <div >
        <Header handleCameraChange={this.handleCameraChange} />
        {this.desktopList()}
        <button onClick={this.testfun}>123</button>
      </div>
    );
  }
}

export default App;