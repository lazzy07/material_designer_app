import { remote, Menu as MenuP, MenuItemConstructorOptions } from "electron";
import {
  openProjectScreen,
  newProjectScreen
} from "./editor_menu_actions/EditorMenuActions";
const { Menu } = remote;

const menu: MenuItemConstructorOptions[] = [
  {
    label: "File",
    submenu: [
      {
        label: "New",
        accelerator: "CommandOrControl+N",
        click: () => openProjectScreen()
      },
      {
        label: "Open",
        accelerator: "CommandOrControl+O",
        click: () => newProjectScreen()
      }
    ]
  },
  {
    label: "Edit",
    role: "editMenu"
  },
  {
    label: "Cloud",
    submenu: [
      {
        label: "Logout"
      }
    ]
  }
];

export class EditorMenu {
  private menu: MenuP = new Menu();

  buildMenu = () => {
    this.menu = Menu.buildFromTemplate(menu);
    return this.menu;
  };
}
