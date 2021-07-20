import React, { Component } from "react";
import SelectS from "react-select";
import "../../scss/select.scss";

export default class Select extends Component {
  render() {
    return (
      <SelectS
        className="matd-select"
        options={[
          { label: "Abstract", value: "abstract" },
          { label: "Vanilla", value: "vanilla" },
        ]}
      />
    );
  }
}
