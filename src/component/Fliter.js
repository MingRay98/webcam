import React, { Component } from 'react';

class Fliter extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  render() {
    return (
      <div align='center'>
        <div className="desktopList" style={{ width: "50vw", display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ width: "100%", display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={this.props.addFliter} value='blur'>++</button>
              {this.props.filterStyle.blur}
              <button onClick={this.props.minusFliter} value='blur'>--</button>
            </div>
            <div style={{ width: "100%", display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={this.props.addFliter} value='grayscale'>++</button>
              {this.props.filterStyle.grayscale}
              <button onClick={this.props.minusFliter} value='grayscale'>--</button>
            </div>
            <div style={{ width: "100%", display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={this.props.addFliter} value='contrast'>++</button>
              {this.props.filterStyle.contrast}
              <button onClick={this.props.minusFliter} value='contrast'>--</button>
            </div>
            <div style={{ width: "100%", display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={this.props.addFliter} value='brightness'>++</button>
              {this.props.filterStyle.brightness}
              <button onClick={this.props.minusFliter} value='brightness'>--</button>
            </div>
          </div>
      </div>
    );
  }
}

export default Fliter;