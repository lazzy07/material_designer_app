import React, { Component } from "react";

interface Props {
  title: string;
}

export default class Button extends Component<Props> {
  render() {
    return (
      <div>
        <button className="gcp-button">{this.props.title}</button>
      </div>
    );
  }
}
