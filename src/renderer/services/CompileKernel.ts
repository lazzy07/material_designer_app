import { ipcRenderer } from "electron";
import { IpcMessages } from "../../IpcMessages";

export const compileKernel = () => {
  ipcRenderer.send(IpcMessages.UPDATE_GRAPH, {
    updateType: "compileKernel",
    update: "",
  });
};
