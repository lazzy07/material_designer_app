import React, { Component } from "react";
import { ChromePicker } from "react-color";

interface Props {
  color: string;
  onChange: (val: string) => void;
}

export default class ColorSelect extends Component<Props> {
  render() {
    return (
      <div>
        <ChromePicker
          color={this.props.color}
          onChangeComplete={(color) => this.props.onChange(color.hex)}
        />
      </div>
    );
  }
}
