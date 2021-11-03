import React, { Component } from "react";

interface Props {
  title: string;
  onClick: () => void;
}

export default class Button extends Component<Props> {
  render() {
    return (
      <div>
        <button className="gcp-button" onClick={this.props.onClick}>
          {this.props.title}
        </button>
      </div>
    );
  }
}
