import React, { Component } from 'react';
import Header from './component/Header'
import Photo from './component/Photo'
import Video from './component/Video'
import './App.css'

let facing = "user"



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //增加constrans 來改
    };
  }

  handleCameraChange = () => {
    facing === 'user'
      ? facing = 'environment'
      : facing = 'user'
      console.log(facing)
  }

  render() {
    return (
      <div >
        <Header handleCameraChange={this.handleCameraChange} />
        <Video facing={facing} />
        <Photo />
      </div>
    );
  }
}

export default App;