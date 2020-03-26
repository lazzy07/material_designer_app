import { Titlebar, Color, TitlebarOptions } from "custom-electron-titlebar";
import { colors } from "../constants/Colors";
import { ipcRenderer } from "electron";
import { IpcMessages } from "../../IpcMessages";
import { EditorMenu } from "../menus/EditorMenu";

export class Titleb {
  private titlebar: Titlebar;
  private menu: Electron.Menu | undefined;
  constructor(options?: any) {
    this.titlebar = new Titlebar({
      backgroundColor: Color.fromHex(colors.DARKER_GREY),
      // shadow: true,
      unfocusEffect: true,
      titleHorizontalAlignment: "center",
      ...options
    });
  }

  getTitlebar = () => {
    return this.titlebar;
  };

  startListenUpdateMenu = () => {
    ipcRenderer.on(IpcMessages.UPDATE_TITLEBAR, () => {
      const em = new EditorMenu();
      if (this.menu) this.titlebar.updateMenu(em.buildMenu());
    });
  };

  setMenu = (menu: Electron.Menu) => {
    this.menu = menu;
    this.titlebar.updateMenu(menu);
  };
}
