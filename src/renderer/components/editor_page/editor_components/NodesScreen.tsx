import React, { Component } from "react";
import InputBox from "../../form/InputBox";
import DropFiles from "./editor_dependencies/common/DropFiles";
import ScreenComponent from "../../common/ScreenComponent";

interface Props { }

interface State { }

export default class NodesScreen extends ScreenComponent<Props, State> {
  render() {
    return (
      <div>
        <div style={{ paddingLeft: "25px", paddingTop: "10px" }}>
          <InputBox
            id={"searchNodes"}
            value={""}
            placeHolder={"Search Nodes"}
            onChange={() => { }}
          />
        </div>
        <DropFiles
          accept={["image/jpeg", "image/png", "image/jpg"]}
          onAccept={e => console.log(e)}
        >
          <div
            style={{
              width: this.state.width,
              height: this.state.height
            }}
          ></div>
        </DropFiles>
      </div>
    );
  }
}
