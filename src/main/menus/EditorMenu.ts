import { Menu, MenuItemConstructorOptions } from "electron";

const menu: MenuItemConstructorOptions[] = [
  {
    label: "File",
    submenu: [
      {
        label: "New",
        click: () => {}
      }
    ]
  }
];

export class EditorMenu {
  private static url: string;
  private menu: Menu = new Menu();

  static setUrl = (url: string) => {
    EditorMenu.url = url;
  };

  buildMenu = () => {
    const m = Menu.buildFromTemplate(menu);
    return m;
  };
}
