import React, { Component } from 'react';

class VideoOutput extends React.Component {
  constructor(props) {
    super(props);
    this.gg = React.createRef();
  }

  componentDidMount() {
    console.log(this.gg);
    const videoObj = this.gg.current;
    videoObj.srcObject = this.props.video;
    videoObj.play();
     
  }

  render() {
    return <video ref={this.gg}></video>;
  }
}


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      video: null
    };

    this.handleVideoClick = this.handleVideoClick.bind(this);
  }


  async getVideo() {
    const video = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: {
        width: { min: 1024, ideal: 1280, max: 1920 },
        height: { min: 776, ideal: 720, max: 1080 }
      }
    })
    // console.log(video);
    this.setState({ video });
  }

  stopVideo() {
    this.state.video.getTracks().forEach(track => track.stop());
    this.setState({ video: null });
  }


  handleVideoClick() {
    if (this.state.video) {
      this.stopVideo();
    } else {
      this.getVideo();
    }
  }

  render() {
    return (
      <div>
        <button onClick={this.handleVideoClick}>
          {this.state.video ? 'Vid On' : 'Vid Off'}
        </button>
        <div>
          {this.state.video ? <VideoOutput video={this.state.video} ss={'123'} /> : ''}
        </div>
      </div>
    );
  }
}

class MyVideo extends React.Component {
  constructor() {
    super();
    this.videoRef = React.createRef();
  }

  async startVideo() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: true
      });

      this.videoStream = stream;
      this.videoRef.current.srcObject = stream;
    } catch (e) {
      alert(e);
    }
  }

  async stopVideo() {
    if (this.videoStream) {
      this.videoStream.getVideoTracks().forEach((track) => {
        track.stop();
      });
      this.videoStream.getAudioTracks().forEach((track) => {
        track.stop();
      });

      this.videoStream = null;
      this.videoRef.current.srcObject = null;
    }
  }

  render() {
    return (
      <div class='container'>
        <video ref={this.videoRef} playsInline={true} autoPlay={true} />
        <button onClick={() => this.startVideo()}>start</button>
        <button onClick={() => this.stopVideo()}>stop</button>
      </div>
    );
  }
}

export default App;