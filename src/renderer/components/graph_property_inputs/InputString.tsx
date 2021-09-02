import { InputGroup } from "@blueprintjs/core";
import React, { Component } from "react";

interface Props {}

export default class InputString extends Component<Props> {
  render() {
    return (
      <div>
        <InputGroup className="gcp-inputstring" />
      </div>
    );
  }
}
