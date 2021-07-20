import React, { Component } from "react";
import SelectS from "react-select";
import "../../scss/select.scss";

interface Props {
  options: { label: string; value: string }[];
  onChange: (val: { label: string; value: string } | any) => void;
  value: { label: string; value: string };
}

export default class Select extends Component<Props, any> {
  render() {
    return (
      <SelectS
        className="matd-select"
        value={this.props.value}
        onChange={this.props.onChange}
        options={this.props.options}
      />
    );
  }
}
