import { NumericInput } from "@blueprintjs/core";
import React, { Component } from "react";

export default class InputNumber extends Component {
  render() {
    return (
      <div>
        <NumericInput
          fill
          className="gcp-inputnumber"
          style={{ width: "100%" }}
        />
      </div>
    );
  }
}
