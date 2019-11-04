import React, { Component } from 'react';

class Fliter extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  render() {
    return (
      <div align='center'>
        <image alt='' src={this.props.imgUrl} ></image>
      </div>
    );
  }
}

export default Fliter;