import React from "react";
import { Menu } from "react-desktop-menus";
import { MenuItem } from "react-desktop-menus";
import { defaultColors } from "../constants/Colors";
import { v4 } from "uuid";

export interface ScreenMenu {
  type: "menu" | "item";
  label: string;
  disabled?: boolean;
  onClick?: () => void;
  content?: ScreenMenu[];
  icon?: any;
}

export const renderScreenMenu = (menu: ScreenMenu[]) => {
  return menu.map((ele, index) => {
    let id = v4();
    if (ele.type === "item") {
      return (
        <MenuItem
          key={id}
          disabled={ele.disabled}
          label={ele.label}
          style={{
            color: defaultColors.FONT_COLOR,
            paddingLeft: 20,
            paddingTop: 5,
            zIndex: 10000,
          }}
          activeColor={defaultColors.DEFAULT_BACKGROUND_COLOR}
          action={ele.onClick || undefined}
          icon={ele.icon}
        />
      );
    } else {
      return (
        <Menu
          keyboard
          label={ele.label}
          style={{
            backgroundColor: defaultColors.IMPORTANT_BACKGROUND_COLOR,
            border: "1px solid " + defaultColors.BORDER_COLOR,
            boxShadow: "2px 1px 1px rgba(0,0,0,0.1)",
            zIndex: 10000,
          }}
          key={id}
        >
          {renderScreenMenu(ele.content!)}
        </Menu>
      );
    }
  });
};
