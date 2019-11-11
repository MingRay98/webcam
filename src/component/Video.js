import React, { Component } from 'react';
import Photo from './Photo';
import Slider from './Slider';
import '../App.css'

let canvasWidth = null, canvasHeight = null;
let imageWidth = 0
let imageHeight = 0
let dx = 0
let dy = 0
let scale = 1

const init = () => {
  if (window.isMobile) {
    canvasWidth = window.innerWidth;
    canvasHeight = canvasWidth * 16 / 9;
    alert('Mobile Mode')
  }
  else {
    canvasWidth = window.innerWidth * 0.4;
    canvasHeight = canvasWidth * 9 / 16;
  }
  imageWidth = canvasWidth
  imageHeight = canvasHeight
}


class Video extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgSrc: '',

    };
  }

  componentDidMount() {
    init();
    this.videoCanvas = document.getElementById('videoCanvas');
    this.video = document.getElementById('video');
    this.videoCanvas.width = canvasWidth;
    this.videoCanvas.height = canvasHeight;
    this.getVideoStream();
    this.drawVideoToCanvas();
    this.photoCanvas = document.getElementById('photoCanvas');
    this.slider = document.getElementById('slider');

  }

  moveSlide = (e) => {
    scale = parseFloat(e.target.value);

    imageWidth = canvasWidth * scale;
    imageHeight = canvasHeight * scale;

    //畫布上的起始點：畫布的大小一半減去圖像大小的一半。可以為負數，表示在左上角的外面。
    dx = this.videoCanvas.width / 2 - imageWidth / 2;
    dy = this.videoCanvas.height / 2 - imageHeight / 2;

  }

  async getVideoStream() {
    try {
      const videoStream = await navigator.mediaDevices.getUserMedia(this.props.constraints)
      console.log(this.props.constraints)
      this.video.srcObject = videoStream;
    } catch (e) {
      alert(e);
    }
  }

  drawVideoToCanvas = () => {
    let ctx = this.videoCanvas.getContext('2d')
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(this.video, dx, dy, imageWidth, imageHeight);
    requestAnimationFrame(this.drawVideoToCanvas);
  }

  handleTurnStream = (e) => {
    console.log(e.target.innerHTML)
    if (e.target.innerHTML === 'turn Off') {
      this.stopStream();
      e.target.innerHTML = "turn On"
    }
    else {
      this.getVideoStream();
      this.drawVideoToCanvas();
      e.target.innerHTML = "turn Off"
    }
  }

  stopStream = () => {
    let stream = this.video.srcObject;
    let tracks = stream.getTracks();
    tracks.forEach(function (track) {
      track.stop();
    });
    this.video.srcObject = null;
  }

  takePhoto = () => {
    this.photoCanvas.width = canvasWidth
    this.photoCanvas.height = canvasHeight
    this.setState({ imgSrc: this.videoCanvas.toDataURL() }, () => { this.drawPhoto() });
    document.getElementById('savePhoto').style = { display: '' };
  }

  drawPhoto = () => {
    const ctx = this.photoCanvas.getContext('2d');

    let img = new Image()
    img.onload = () => {
      ctx.filter = this.props.filterStyle.blur + " " + this.props.filterStyle.grayscale + " " + this.props.filterStyle.brightness + " " + this.props.filterStyle.contrast;
      ctx.scale(-1, 1);
      ctx.translate(-ctx.canvas.width, 0)
      ctx.drawImage(img, 0, 0);
      if (this.props.constraints.video.facingMode === 'environment')
        ctx.scale(1, 1);
    }
    img.src = this.state.imgSrc;
  }

  // this.photoCanvas.width = imageWidth;
  // this.photoCanvas.height = imageHeight;
  // ctx.scale(-1, 1);
  // ctx.translate(-ctx.canvas.width, 0)
  // ctx.drawImage(img, -dx, -dy);

  downloadCanvasIamge = (e) => {
    let downloadImg = document.getElementById('downloadImg');
    downloadImg.href = this.photoCanvas.toDataURL();
    downloadImg.download = "photo.png";
    downloadImg.click();
  }

  render() {

    const filterStyle = { filter: this.props.filterStyle.blur + " " + this.props.filterStyle.grayscale + " " + this.props.filterStyle.brightness + " " + this.props.filterStyle.contrast };

    return (
      <div align="center">
        <video autoPlay={true} id="video" style={{ display: "none"  }} />
        <canvas id="videoCanvas" style={filterStyle} className='Stream' /><br />
        <Slider moveSlide={this.moveSlide} handleTurnStream={this.handleTurnStream} takePhoto={this.takePhoto} downloadCanvasIamge={this.downloadCanvasIamge} width={this.canvasWidth} />
        <Photo />
      </div>
    );
  }
}

export default Video;