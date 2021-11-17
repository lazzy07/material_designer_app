import React, { Component } from "react";
import DD, { Option } from "react-dropdown";
import "react-dropdown/style.css";

interface Props {
  options: Option[];
  value: string;
  onChange: (val: Option) => void;
}

export default class Dropdown extends Component<Props> {
  render() {
    return (
      <div>
        <DD
          onChange={this.props.onChange}
          options={this.props.options}
          value={this.props.value}
        />
      </div>
    );
  }
}
