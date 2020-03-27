import React, { Component } from "react";
import Menubar from "../../../common/MenuBar";
import { ScreenMenu } from "../../../../services/RenderMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCube, faPlus, faWrench } from "@fortawesome/free-solid-svg-icons";
import { defaultColors } from "../../../../constants/Colors";

const menu: ScreenMenu[] = [
  {
    label: "Geometry",
    type: "menu",
    content: [
      {
        label: "Cube",
        type: "item",
        icon: (
          <FontAwesomeIcon
            icon={faCube}
            style={{ color: defaultColors.FONT_COLOR }}
          />
        ),
        content: []
      },
      {
        label: "Plain",
        type: "item",
        icon: (
          <FontAwesomeIcon
            icon={faCube}
            style={{ color: defaultColors.FONT_COLOR }}
          />
        ),
        content: []
      },
      {
        label: "Sphere",
        type: "item",
        icon: (
          <FontAwesomeIcon
            icon={faCube}
            style={{ color: defaultColors.FONT_COLOR }}
          />
        ),
        content: []
      },
      {
        label: "Custom",
        type: "item",
        icon: (
          <FontAwesomeIcon
            icon={faPlus}
            style={{ color: defaultColors.FONT_COLOR }}
          />
        ),
        content: []
      }
    ]
  },
  {
    label: "Settings",
    type: "menu",
    content: [
      {
        label: "Subdivision",
        type: "item",
        icon: (
          <FontAwesomeIcon
            icon={faWrench}
            style={{ color: defaultColors.FONT_COLOR }}
          />
        ),
        content: []
      },
      {
        label: "Wireframe",
        type: "item",
        icon: (
          <FontAwesomeIcon
            icon={faWrench}
            style={{ color: defaultColors.FONT_COLOR }}
          />
        ),
        content: []
      }
    ]
  }
];

export default class Preview3dMenu extends Component {
  render() {
    return (
      <div
        style={{ width: "100%", display: "flex-box", flexDirection: "column" }}
      >
        <div style={{ width: "100%" }}>
          <Menubar menu={menu} />
        </div>
        <div
          style={{
            width: "100%",
            height: "100%"
          }}
        >
          Hello
        </div>
      </div>
    );
  }
}
