import React, { Component } from "react";
import DD from "react-dropdown";
import "react-dropdown/style.css";

export default class Dropdown extends Component {
  render() {
    return (
      <div>
        <DD options={["Hello", "World"]} />
      </div>
    );
  }
}
