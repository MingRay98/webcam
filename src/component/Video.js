import React, { Component } from 'react';
import Photo from './Photo';
import Slider from './Slider';

let canvasWidth = null, canvasHeight = null;
let imageWidth = 0
let imageHeight = 0
let dx = 0
let dy = 0
let scale = 1

window.onresize = function (event) {
  let videoCanvas = document.getElementById('videoCanvas');
  let photoCanvas = document.getElementById('photoCanvas');
  let slider = document.getElementById('slider');
  videoCanvas.style.width = '95%'
  photoCanvas.style.width = '95%'
  slider.style.width = '95%'
  if (window.innerWidth < 700 && !window.isMobile)
    window.location.reload()
};

const init = () => {
  if (window.isMobile) {
    canvasWidth = window.innerWidth;
    canvasHeight = canvasWidth * 4 / 3;
    alert('Mobile Mode')
  }
  else {
    canvasWidth = window.innerWidth * 0.4;
    canvasHeight = canvasWidth * 0.5625;
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
    // this.slider.addEventListener('touchstart', this.startSlide, false);
    // this.slider.addEventListener('touchend', this.stopSlide, false);

  }

  startSlide = (e) => {
    this.slider.addEventListener('mousemove', this.moveSlide, false);
    this.slider.addEventListener('touchmove', this.moveSlide, false);

  }
  moveSlide = (e) => {
    scale = parseFloat(e.target.value);

    imageWidth = canvasWidth * scale;
    imageHeight = canvasHeight * scale;

    //畫布上的起始點：畫布的大小一半減去圖像大小的一半。可以為負數，表示在左上角的外面。
    dx = this.videoCanvas.width / 2 - imageWidth / 2;
    dy = this.videoCanvas.height / 2 - imageHeight / 2;

  }
  stopSlide = (e) => {
    this.slider.removeEventListener('mousemove', this.moveSlide, false);
    this.slider.removeEventListener('touchmove', this.moveSlide, false);
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
      if (scale >= 1) {
        ctx.scale(-1, 1);
        ctx.translate(-ctx.canvas.width, 0)
        ctx.drawImage(img, 0, 0);
      } else {
        this.photoCanvas.width = imageWidth;
        this.photoCanvas.height = imageHeight;
        ctx.scale(-1, 1);
        ctx.translate(-ctx.canvas.width, 0)
        ctx.drawImage(img, -dx, -dy);
      }
    }
    img.src = this.state.imgSrc;
  }

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
        <video autoPlay={true} id="video" style={{ display: 'none' }} />
        <canvas id="videoCanvas" style={filterStyle} className='Stream' /><br />
        <Slider moveSlide={this.moveSlide} handleTurnStream={this.handleTurnStream} takePhoto={this.takePhoto} downloadCanvasIamge={this.downloadCanvasIamge} width={this.canvasWidth} />
        <Photo />
      </div>
    );
  }
}

export default Video;