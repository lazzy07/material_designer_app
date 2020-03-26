import { remote, Menu as MenuP, MenuItemConstructorOptions } from "electron";
import {
  openProjectScreen,
  newProjectScreen,
  openLoginScreen
} from "./editor_menu_actions/EditorMenuActions";
import { getActiveItems } from "../../main_services/ActiveElementTypes";
const { Menu } = remote;

let checked = false;

const renderWindowMenuElements = (): MenuItemConstructorOptions[] => {
  return [
    {
      label: "Reset to Default"
    },
    {
      type: "separator"
    },
    {
      label: "Nodes",
      type: "checkbox",
      checked,

      click: () => {
        checked = !checked;
      }
    },
    {
      label: "HDRIs"
    },
    {
      label: "Textures"
    },
    {
      label: "3D Preview"
    },
    {
      label: "Node Preview"
    },
    {
      label: "Graph Editor"
    },
    {
      label: "Outliner"
    },
    {
      label: "Node Props"
    },
    {
      label: "Project Props"
    }
  ];
};

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
  },
  {
    label: "Windows",
    submenu: renderWindowMenuElements()
  }
];

export class EditorMenu {
  private menu: MenuP = new Menu();

  buildMenu = () => {
    this.menu = Menu.buildFromTemplate(menu);
    return this.menu;
  };
}
