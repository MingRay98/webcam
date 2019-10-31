import React, { Component } from 'react';

let canvasWidth = window.innerWidth, canvasHeight = canvasWidth * 0.5625;



class Video extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.videoCanvas = document.getElementById('videoCanvas');
    this.video = document.getElementById('video');
    this.videoCanvas.width = canvasWidth;
    this.videoCanvas.height = canvasHeight;
    this.getVideoStream();
    this.drawVideoToCanvas();
  }

  async getVideoStream() {
    try {
      const videoStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user'},
        audio: false
      })
      this.video.srcObject = videoStream;
    } catch (e) {
      alert(e);
    }
  }

  drawVideoToCanvas = () => {
    let ctx = this.videoCanvas.getContext('2d')
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(this.video, 0, 0, canvasWidth, canvasHeight);
    requestAnimationFrame(this.drawVideoToCanvas);
  }



  render() {
    return (
      <div>
        <video autoPlay={true} id="video" style={{ display: 'none' }} />
        <canvas id="videoCanvas" className='Stream' /><br />
      </div>
    );
  }
}

export default Video;