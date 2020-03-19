import { remote, Menu as MenuP, MenuItemConstructorOptions } from "electron";
const { Menu } = remote;

const menu: MenuItemConstructorOptions[] = [
  {
    label: "File",
    submenu: [
      {
        label: "New",
        click: () => {}
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
