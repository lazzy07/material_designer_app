import React, { Component } from 'react'
import { ContextMenu as CM, Menu, Item } from "react-desktop-menus"
import { NodeData } from '../../../interfaces/NodeData'
import { renderScreenMenu, ScreenMenu } from '../../services/RenderMenu'

interface Props {
  localLibraryNodes: NodeData[];
  localProjectNodes: NodeData[];
}

export default class ContextMenu extends Component<Props> {
  ref = React.createRef<any>();

  createMenu = (): ScreenMenu[] => {
    const data = [...this.props.localLibraryNodes, ...this.props.localProjectNodes];
    let screenMenu: ScreenMenu[] = []
    for (const i of data) {
      let j: ScreenMenu = {
        label: i.name,
        type: "item",
        onClick: this.onClick
      }

      screenMenu.push(j);
    }

    return [{ type: "menu", label: "context", content: screenMenu }]
  }

  onClick = () => {
    this.ref.current.close()
  }


  render() {
    return (
      <CM ref={this.ref} menu={renderScreenMenu(this.createMenu())}>
        {this.props.children}
      </CM>
    )
  }
}
