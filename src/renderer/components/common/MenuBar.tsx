import React, { Component } from "react";
import { Menubar as Mb } from "react-desktop-menus";
import { defaultColors } from "../../constants/Colors";
import { ScreenMenu, renderScreenMenu } from "../../services/RenderMenu";

interface Props {
  menu: ScreenMenu[];
}

export default class Menubar extends Component<Props, any> {
  render() {
    return (
      <Mb
        itemHoverColor={defaultColors.IMPORTANT_BACKGROUND_COLOR}
        style={{ backgroundColor: defaultColors.DEFAULT_BACKGROUND_COLOR, zIndex: 100 }}
      >
        {renderScreenMenu(this.props.menu)}
      </Mb>
    );
  }
}
