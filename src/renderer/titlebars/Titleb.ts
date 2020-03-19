import { Titlebar, Color, TitlebarOptions } from "custom-electron-titlebar";
import { colors } from "../constants/Colors";

export class Titleb {
  private titlebar: Titlebar;

  constructor(options?: any) {
    this.titlebar = new Titlebar({
      backgroundColor: Color.fromHex(colors.DARKER_GREY),
      shadow: true,
      unfocusEffect: true,
      titleHorizontalAlignment: "center",
      ...options
    });
  }

  getTitlebar = () => {
    return this.titlebar;
  };

  setMenu = (menu: Electron.Menu) => {
    this.titlebar.updateMenu(menu);
  };
}
