import React, { Component } from 'react';
import './App.css'

let imageWidth = '1080'
let imageHeight = '720'
let dx = ''
let dy = ''
let scale = '1'


class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgSrc: '',
    };
  }

  componentDidMount() {

    this.canvas = document.getElementById('canvas');
    this.canvas2 = document.getElementById('canvas2');
    this.video = document.getElementById('video');
    this.slider = document.getElementById('slider');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.canvas2.width = 1024;
    this.canvas2.height = 768;
    this.startVideo();
    this.drawVideoToCanvas();
    this.slider.onchange = this.handleSliderChange;
    window.addEventListener("resize", this.resizeCanvas, false);
  }

  componentWillMount() {
  }

  resizeCanvas =() => {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    console.log(window.innerWidth,window.innerHeight)
  }

  handleSliderChange = (e) => {
    scale = parseFloat(e.target.value);

    imageWidth = 1024 * scale;
    imageHeight = 768 * scale;
    if (scale <= 1) {
      this.canvas.width = imageWidth
      this.canvas.height = imageHeight
    }
    //畫布上的起始點：畫布的大小一半減去圖像大小的一半。可以為負數，表示在左上角的外面。
    dx = this.canvas.width / 2 - imageWidth / 2;
    dy = this.canvas.height / 2 - imageHeight / 2;

  }


  async startVideo() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          // width: { min: 1080, ideal: 1280, max: 1920 },
          // height: { min: 720, ideal: 720, max: 1080 }
        },
        audio: false
      });
      this.video.srcObject = stream;
    } catch (e) {
      alert(e);
    }
  }

  stopStream = () => {
    let stream = this.video.srcObject;
    let tracks = stream.getTracks();

    console.log(stream, tracks)

    tracks.forEach(function (track) {
      track.stop();
    });

    this.video.srcObject = null;
  }

  drawVideoToCanvas = () => {

    let ctx = this.canvas.getContext('2d')
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    ctx.drawImage(this.video, dx, dy, imageWidth, imageHeight);



    requestAnimationFrame(this.drawVideoToCanvas);

  }

  draw = () => {

    var ctx = document.getElementById('canvas2').getContext('2d');
    var img = new Image();
    img.onload = function () {
      ctx.scale(-1, 1);
      ctx.translate(-1080, 0);
      ctx.drawImage(img, 0, 0);
    };
    img.src = this.state.imgSrc;

  }

  takePhoto = () => {
    this.canvas2.width = imageWidth
    this.canvas2.height = imageHeight
    this.setState({ imgSrc: this.canvas.toDataURL() }, () => { this.draw() });
  }

  render() {
    return (
      <div align="center">
        <video autoPlay={true} id="video" style={{ display: 'none' }} />
        <canvas id="canvas" className='Stream' /><br />
        <input type="range" min="0.5" max="1.5" step="0.1" defaultValue="1" id="slider" />
        <button onClick={this.stopStream}>stop stream</button>
        <button onClick={this.takePhoto}>take a photo</button><br />
        <canvas id="canvas2" /><br />
        {/* <img alt='' id="photocut" src={this.state.imgSrc} /> */}
      </div>
    );
  }
}

export default Main;