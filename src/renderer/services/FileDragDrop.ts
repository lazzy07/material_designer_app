import {
  DRAGGABLE_ITEM_TYPE,
  DraggableItem,
} from "../../interfaces/DraggableItem";
import { ipcRenderer } from "electron";
import { IS_WEB } from "./Webguard";
/**
 * Handling internal file drag drop (not files from browser)
 * @param type
 * @param onAccept
 */
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

/**
 * Sending file data on start of the drag
 */
export const sendFileDataOnDragStart = () => {};

export const stopFileDropListner = (type: DRAGGABLE_ITEM_TYPE, func: any) => {
  ipcRenderer.removeListener(type, func);
};
