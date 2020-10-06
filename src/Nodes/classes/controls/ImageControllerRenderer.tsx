import React, { Component } from 'react'

export default class ImageControllerRenderer extends Component<any, any> {
  componentDidMount = () => {
    console.log(this.props);
  };

  render() {
    return (
      <div>
        <h1>Hello</h1>
      </div>
    )
  }
}