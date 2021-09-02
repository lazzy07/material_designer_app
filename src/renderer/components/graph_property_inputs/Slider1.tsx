import { Slider } from "@blueprintjs/core";
import React, { Component } from "react";

export default class Slider1 extends Component {
  render() {
    return (
      <div>
        <Slider className="gcp-slider1" value={5} />
      </div>
    );
  }
}
