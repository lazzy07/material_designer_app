import { NumericInput } from "@blueprintjs/core";
import React, { Component } from "react";

interface Props {
  value: number;
  onChange: (val: number) => void;
}

export default class InputNumber extends Component<Props> {
  render() {
    return (
      <div>
        <NumericInput
          fill
          className="gcp-inputnumber"
          style={{ width: "100%" }}
          value={this.props.value}
          onValueChange={this.props.onChange}
        />
      </div>
    );
  }
}
