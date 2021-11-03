import { InputGroup } from "@blueprintjs/core";
import React, { Component } from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default class InputString extends Component<Props> {
  render() {
    return (
      <div>
        <InputGroup
          className="gcp-inputstring"
          value={this.props.value}
          onChange={(e) => this.props.onChange(e.target.value)}
        />
      </div>
    );
  }
}
