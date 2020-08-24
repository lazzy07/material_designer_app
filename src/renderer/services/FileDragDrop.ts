import {
  DRAGGABLE_ITEM_TYPE,
  DraggableItem,
} from "../../interfaces/DraggableItem";
import { ipcRenderer } from "electron";
import { IS_WEB } from "./Webguard";

export const onFileDrop = <T>(
  type: DRAGGABLE_ITEM_TYPE,
  onAccept: (data: DraggableItem<T>) => void
) => {
  if (!IS_WEB) {
    ipcRenderer.on(type, (_, data) => onAccept(data));
  } else {
    //TODO:: Add web functionality
  }
};

export const stopFileDropListner = (type: DRAGGABLE_ITEM_TYPE, func: any) => {
  ipcRenderer.removeListener(type, func);
};
