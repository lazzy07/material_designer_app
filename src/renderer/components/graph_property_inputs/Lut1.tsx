import React, { Component } from "react";
import LutMaker from "../lut_creator/LutMaker";

export default class Lut1 extends Component {
  render() {
    return (
      <div>
        <LutMaker
          lutType="gradient"
          onChange={() => {}}
          onClickItem={() => {}}
          val={[]}
        />
      </div>
    );
  }
}
