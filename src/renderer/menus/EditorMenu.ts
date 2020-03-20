import { remote, Menu as MenuP, MenuItemConstructorOptions } from "electron";
import {
  openProjectScreen,
  newProjectScreen,
  openLoginScreen
} from "./editor_menu_actions/EditorMenuActions";
const { Menu } = remote;

const menu: MenuItemConstructorOptions[] = [
  {
    label: "File",
    submenu: [
      {
        label: "New",
        accelerator: "CommandOrControl+N",
        click: () => newProjectScreen()
      },
      {
        label: "Open",
        accelerator: "CommandOrControl+O",
        click: () => openProjectScreen()
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
        label: "Login",
        click: () => openLoginScreen()
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
