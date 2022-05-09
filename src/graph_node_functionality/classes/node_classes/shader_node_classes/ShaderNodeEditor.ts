import NodeEditor from "../common/NodeEditor";
import DataNodeEngine from "./ShaderNodeEngine";
import NodeLibrary from "../common/NodeLibrary";
import { ipcRenderer } from "electron";
import { IpcMessages } from "../../../../IpcMessages";

export default class ShaderNodeEditor extends NodeEditor {
  constructor(domElement: HTMLDivElement) {
    super(domElement, new DataNodeEngine());

    ipcRenderer.on(IpcMessages.UPDATE_TEXTURE_POINTER, (e, args) => {
      this.getReteEditor().nodes.forEach((node) => {
        if (node.id == args.id) {
          node.controls.forEach((c) => {
            var arrayBufferView = new Uint8Array(args.buffer);
            var iData = new ImageData(
              new Uint8ClampedArray(arrayBufferView.buffer),
              1024,
              1024
            );

            const canvas: HTMLCanvasElement = document.getElementById(
              (c as any).id
            )! as HTMLCanvasElement;

            const ctx = canvas.getContext("2d");
            ctx?.putImageData(iData, 0, 0);
          });
        }
      });
    });
  }

  registerNodes = (nodeLibrary: NodeLibrary) => {
    const nodes = nodeLibrary.getReteNodes();
    for (const i of nodes) {
      this.getReteEditor().register(i);
      // this.engine.getReteEngine().register(i);
    }
  };
}
