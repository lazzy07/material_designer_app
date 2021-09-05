import React, { Component } from "react";
import ColorSelect from "../form/ColorSelect";

interface Props {
  id: string;
}

export default class ColorPicker3 extends Component<Props> {
  render() {
    return (
      <div>
        <ColorSelect
          id={this.props.id}
          color={"#e8232d"}
          onChange={(val) => console.log(val)}
          screen="editor"
        />
      </div>
    );
  }
}
