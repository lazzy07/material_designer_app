import React, { Component } from "react";
import { ScreenMenu } from "../../../../../services/RenderMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages } from "@fortawesome/free-solid-svg-icons";
import { defaultColors } from "../../../../../constants/Colors";
import Menubar from "../../../../common/MenuBar";

const menu: ScreenMenu[] = [
  {
    label: "Options",
    type: "menu",
    content: [
      {
        label: "Tiling",
        icon: (
          <FontAwesomeIcon
            icon={faImages}
            style={{ color: defaultColors.FONT_COLOR }}
          />
        ),
        type: "item"
      }
    ]
  }
];

export default class NodePreviewMenu extends Component {
  render() {
    return (
      <div>
        <Menubar menu={menu} />
      </div>
    );
  }
}
