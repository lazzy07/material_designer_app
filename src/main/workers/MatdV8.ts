import { screens } from "./../main";
import { ipcMain } from "electron";
import { IpcMessages } from "../../IpcMessages";

export default class MatdV8 {
  private libPath: string;
  private static matdV8: MatdV8;
  private matdLib: any;

  private constructor(libPath: string) {
    this.libPath = libPath;
    const MatdObj = eval("require")(this.libPath);

    this.matdLib = new MatdObj.MatdV8();
  }

  static init(libPath: string) {
    MatdV8.matdV8 = new MatdV8(libPath);
  }

  static getLib() {
    return MatdV8.matdV8.matdLib;
  }

  static setComputationDevice(platformID: number, deviceID: number) {
    this.getLib().setComputationDevice(platformID, deviceID);
  }

  static getAvailableEngines(): {
    platformID: number;
    deviceID: number;
    platformName: string;
    deviceName: string;
  }[] {
    return this.getLib().getAvailableEngines();
  }

  static openMaterialProject(materialProject: string) {
    this.getLib().openMaterialProject(materialProject);
  }

  static updateMaterialProject(materialProject: string) {
    this.getLib().updateMaterialProject(materialProject);
  }

  static updateMaterialGraph(updateType: string, update: string) {
    try {
      this.getLib().updateMaterialGraph(
        updateType,
        update,
        (id: number, buffer: ArrayBuffer) => {
          if (id) {
            screens.editorScreen.window?.webContents.send(
              IpcMessages.UPDATE_TEXTURE_POINTER,
              {
                id,
                buffer,
              }
            );

            screens.subEditorScreens.forEach((w) => {
              w.window?.webContents.send(IpcMessages.UPDATE_TEXTURE_POINTER, {
                id,
                buffer,
              });
            });
          }
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  static selectCurrentMaterialGraph(graph: string) {
    this.getLib().selectCurrentMaterialGraph(graph);
  }

  static compileKernel(func: (error: string) => void) {
    this.getLib().compileKernel(func);
  }
}
