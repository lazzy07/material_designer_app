import React, { Component } from "react";
import { ContextMenu } from "../../../packages/react-context-menu";
import { renderScreenMenu, ScreenMenu } from "../../services/RenderMenu";

interface Props {
  contextMenu: ScreenMenu[];
}

export default class OutlinerContextMenu extends Component<Props> {
  ref = React.createRef<ContextMenu>();

  closeMenu = () => {
    this.ref.current!.close();
  };

  componentDidMount = () => {
    this.ref.current!.handleClickDoc(null);
  };

  render() {
    return (
      <ContextMenu
        style={{ zIndex: 1000000 }}
        ref={this.ref}
        menu={renderScreenMenu(this.props.contextMenu)}
      >
        {this.props.children}
      </ContextMenu>
    );
  }
}
