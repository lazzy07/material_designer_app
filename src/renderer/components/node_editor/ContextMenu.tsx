import { faCopy, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react'
import { ContextMenu as CM } from "../../../packages/react-context-menu"
import { NodeData } from '../../../interfaces/NodeData'
import { Node } from '../../../packages/rete-1.4.4';
import { defaultColors } from '../../constants/Colors';
import { renderScreenMenu, ScreenMenu } from '../../services/RenderMenu'

export type CONTEXT_MENU_TYPE = "node" | "editor";

interface Props {
  localLibraryNodes: NodeData[];
  localProjectNodes: NodeData[];
  selectedType: CONTEXT_MENU_TYPE;
  selectedNode: Node | null;
  onClickAction: (nodeData: NodeData) => void;
  onClickCopy: (node: Node) => void;
  onClickDelete: (node: Node) => void;
}

export default class ContextMenu extends Component<Props> {
  ref = React.createRef<CM>();

  createMenu = (): ScreenMenu[] => {
    if (this.props.selectedType === "editor") {
      const data = [...this.props.localLibraryNodes, ...this.props.localProjectNodes];
      let screenMenu: ScreenMenu[] = []
      for (const i of data) {
        let j: ScreenMenu = {
          label: i.name,
          type: "item",
          onClick: () => this.onClick(i)
        }

        screenMenu.push(j);
      }

      return [{ type: "menu", label: "context", content: screenMenu }]
    } else {
      return [
        {
          type: "menu", label: "context",
          content: [{
            label: "Copy",
            type: "item",
            onClick: this.onClickCopy,
            icon: <FontAwesomeIcon icon={faCopy} style={{ color: defaultColors.FONT_COLOR }} />
          },
          {
            label: "Delete",
            type: "item",
            onClick: this.onClickDelete,
            icon: <FontAwesomeIcon icon={faTrash} style={{ color: defaultColors.FONT_COLOR }} />
          }]
        }]
    }

  }

  onClick = (nodeData: NodeData) => {
    this.ref.current!.close();
    this.props.onClickAction(nodeData);
  }

  onClickCopy = () => {
    this.ref.current!.close();
    this.props.onClickCopy(this.props.selectedNode!)
  }

  onClickDelete = () => {
    this.ref.current!.close();
    this.props.onClickDelete(this.props.selectedNode!)
  }

  componentDidMount = () => {
    this.ref.current!.handleClickDoc();
  };


  render() {
    return (
      <CM ref={this.ref} menu={renderScreenMenu(this.createMenu())}>
        {this.props.children}
      </CM>
    )
  }
}
