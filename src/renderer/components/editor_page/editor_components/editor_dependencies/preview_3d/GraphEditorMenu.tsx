import React, { Component } from 'react';
import { ScreenMenu } from './../../../../../services/RenderMenu';
import Menubar from "../../../../common/MenuBar";

const menu: ScreenMenu[] = [
  {
    label: "Options",
    type: "menu",
    content: []
  }
]

export default class GraphEditorMenu extends Component {
  render() {
    return (
      <div style={{ width: "100%", zIndex: 400 }}>
        <Menubar menu={menu} />
      </div>
    )
  }
}