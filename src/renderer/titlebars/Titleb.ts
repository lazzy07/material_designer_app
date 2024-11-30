import { defaultColors } from "../constants/Colors";
import { ipcRenderer, Menu } from "electron";
import { IpcMessages } from "../../IpcMessages";
import { EditorMenu } from "../menus/EditorMenu";
import { Titlebar, Color } from "custom-electron-titlebar";
import {} from "electron"

export class Titleb {
  private menu: Electron.Menu | undefined;
  private titlebar: Titlebar;

  constructor(options?: any) {
    this.titlebar = new Titlebar({
      backgroundColor: Color.fromHex(defaultColors.IMPORTANT_BACKGROUND_COLOR),
      // shadow: true,
      unfocusEffect: true,
      titleHorizontalAlignment: "center",
      ...options,
    });
  }

  getTitlebar = () => {
    return this.titlebar;
  };

  getMenu = () => {
    return this.menu;
  }

  startListenUpdateMenu = () => {
    ipcRenderer.on(IpcMessages.UPDATE_TITLEBAR, () => {
      const em = new EditorMenu();
      if (this.menu) this.titlebar.updateMenu(em.buildMenu());
    });
  };

  setMenu = (menu: Electron.Menu) => {
    this.menu = menu;
  };
}
