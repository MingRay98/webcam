import React, { Component } from 'react';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scale: '1',
      imgSrc: ''
    };
  }

  componentDidMount() {
    this.startVideo();
    this.canvas = document.getElementById('canvas');
    this.canvas2 = document.getElementById('photocut');
    this.video = document.getElementById('video');
    this.slider = document.getElementById('很滑');
    this.canvas.width = 1024;
    this.canvas.height = 776;

    this.drawVideoToCanvas();

    this.slider.onchange = this.handleSliderChange;


    // console.log(this.slider);
  }

  componentWillMount() {

  }

  handleSliderChange = (e) => {

    this.setState({ scale: e.target.value });

  }


  async startVideo() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { min: 1024, ideal: 1280, max: 1920 },
          height: { min: 776, ideal: 720, max: 1080 }
        },
        audio: false
      });

      // this.videoStream = stream;
      // window.stream = stream;
      this.video.srcObject = stream;
    } catch (e) {
      alert(e);
    }
  }

  drawVideoToCanvas = () => {

    
    this.canvas.getContext('2d').clearRect(0, 0, this.canvas.width, this.canvas.height);

    let scale = parseFloat(this.state.scale);

    var imageWidth = this.canvas.width * scale;
    var imageHeight = this.canvas.height * scale;

    //畫布上的起始點：畫布的大小一半減去圖像大小的一半。可以為負數，表示在左上角的外面。
    var dx = this.canvas.width / 2 - imageWidth / 2;
    var dy = this.canvas.height / 2 - imageHeight / 2;

    console.log(scale);


    this.canvas.getContext('2d').drawImage(this.video, dx, dy, imageWidth, imageHeight);

    

    requestAnimationFrame(this.drawVideoToCanvas);

  }



  takePhoto = () => {


    this.setState({imgSrc : this.canvas.toDataURL()});

  }

  render() {
    return (

      <div style={{ margin: "auto" }}>
        <video ref={this.videoRef} autoPlay={true} id="video" style={{ display: 'none' }} />
        <canvas id="canvas" /><br />
        <input type="range" min="0.5" max="1.5" step="0.1" defaultValue="1" id="很滑" />
        <button onClick={this.takePhoto}>take a photo</button>
        <img alt='' id="photocut" src = {this.state.imgSrc} />
      </div>
    );
  }
}

export default Main;