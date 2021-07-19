import { remote, Menu as MenuP, MenuItemConstructorOptions } from "electron";
import {
  openProjectScreen,
  newProjectScreen,
  openLoginScreen,
  onClickWindow,
  onClickDefaultWindow,
  openPreferencesScreen,
} from "./editor_menu_actions/EditorMenuActions";
import { getActiveItems } from "../../main_services/ActiveElementTypes";
import { allElements } from "./../../EditorElements/index";
import { ElementsToLocalStorage } from "../../EditorElements/ElementsToLocalStorage";
const { Menu } = remote;

const isChecked = (title: string): boolean => {
  const strMain = localStorage.getItem("mainConfig");
  ElementsToLocalStorage.initData();
  let subdata = ElementsToLocalStorage.data;

  let activeElems: string[] = [];

  if (strMain) {
    const data = JSON.parse(strMain);

    let main = getActiveItems(data);
    activeElems = [...main];
  } else {
    return true;
  }
  for (let i of subdata) {
    const d = getActiveItems(i.config);
    activeElems = [...activeElems, ...d];
  }

  for (let i of activeElems) {
    if (i === title) {
      return true;
    }
  }

  return false;
};

const getAllWindowElements = (): MenuItemConstructorOptions[] => {
  return allElements.map((ele): MenuItemConstructorOptions => {
    const checked = isChecked(ele.title);
    return {
      label: ele.title,
      type: "checkbox",
      checked,
      enabled: !checked,
      click: () => onClickWindow(ele, checked),
    };
  });
};

const renderWindowMenuElements = (): MenuItemConstructorOptions[] => {
  return [
    {
      label: "Reset to Default",
      click: () => onClickDefaultWindow(),
    },
    {
      type: "separator",
    },
    ...getAllWindowElements(),
  ];
};

const getMenu = (): MenuItemConstructorOptions[] => [
  {
    label: "File",
    submenu: [
      {
        label: "New",
        accelerator: "CommandOrControl+N",
        click: () => newProjectScreen(),
      },
      {
        label: "Open",
        accelerator: "CommandOrControl+O",
        click: () => openProjectScreen(),
      },
      {
        label: "Preferences",
        click: () => openPreferencesScreen(),
      },
    ],
  },
  {
    label: "Edit",
    role: "editMenu",
  },
  {
    label: "Cloud",
    submenu: [
      {
        label: "Login",
        click: () => openLoginScreen(),
      },
    ],
  },
  {
    label: "Windows",
    submenu: renderWindowMenuElements(),
  },
];

export class EditorMenu {
  private menu: MenuP = new Menu();

  buildMenu = () => {
    this.menu = Menu.buildFromTemplate(getMenu());
    return this.menu;
  };
}
