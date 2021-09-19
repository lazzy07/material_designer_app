import React, { Component } from "react";
import ColorSelect from "../form/ColorSelect";

interface Props {
  id: string;
  value: string;
  onChange: (val: string) => void;
}

export default class ColorPicker3 extends Component<Props> {
  render() {
    return (
      <div>
        <ColorSelect
          id={this.props.id}
          color={this.props.value}
          onChange={this.props.onChange}
          screen="editor"
        />
      </div>
    );
  }
}
