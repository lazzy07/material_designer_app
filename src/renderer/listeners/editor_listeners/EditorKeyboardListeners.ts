import {
  openProjectScreen,
  newProjectScreen,
} from "../../menus/editor_menu_actions/EditorMenuActions";
import { IS_WEB } from "../../services/Webguard";

export const startKeyboardListners = () => {
  window.addEventListener("keyup", (event) => {
    saveProjectListner(event);
    openProjectListner(event);
    newProjectListner(event);
  });
};

const saveProjectListner = (event: KeyboardEvent) => {
  if (event.code === "KeyS" && event.ctrlKey == true) {
  }
};

const openProjectListner = (event: KeyboardEvent) => {
  if (event.code === "KeyO" && event.ctrlKey == true) {
    if (!IS_WEB) {
      openProjectScreen();
    }
  }
};

const newProjectListner = (event: KeyboardEvent) => {
  if (event.code === "KeyN" && event.ctrlKey == true) {
    if (!IS_WEB) {
      newProjectScreen();
    }
  }
};
