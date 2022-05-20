import { elementSizeToBitDepth } from "./../../../../renderer/services/ElementSizeToTextureBitDepth";
import { IpcMessages } from "./../../../../IpcMessages/index";
import NodeEditor from "../common/NodeEditor";
import DataNodeEngine from "./ShaderNodeEngine";
import NodeLibrary from "../common/NodeLibrary";
import { ipcRenderer } from "electron";
import { TEXTURE_BIT_DEPTH } from "../../../../interfaces/TextureBitDepths";

export default class ShaderNodeEditor extends NodeEditor {
  constructor(domElement: HTMLDivElement) {
    super(domElement, new DataNodeEngine(), "shaderGraph");

    ipcRenderer.on(
      IpcMessages.UPDATE_TEXTURE_POINTER,
      (
        _,
        args: { nodeId: number; buffer: ArrayBuffer; elementSize: number }
      ) => {
        const bitType = elementSizeToBitDepth(args.elementSize);
        let buffer: any;
        if (bitType === TEXTURE_BIT_DEPTH.U_INT_8) {
          buffer = new Uint8Array(args.buffer);
        } else if (bitType === TEXTURE_BIT_DEPTH.U_INT_16) {
          buffer = new Uint16Array(args.buffer);
        } else if (bitType === TEXTURE_BIT_DEPTH.U_INT_32) {
          buffer = new Uint32Array(args.buffer);
        }
        if (buffer) {
          this.getReteEditor().nodes.forEach((node) => {
            if (node.id === args.nodeId) {
              if (buffer) {
                const imgData = new ImageData(
                  new Uint8ClampedArray(buffer),
                  1024,
                  1024
                );
                node.meta.tex = imgData;
                node.meta.texUpdate = true;
              }
            }
          });

          this.getReteEngine().process(this.getReteEditor().toJSON());
        }
      }
    );
  }

  registerNodes = (nodeLibrary: NodeLibrary) => {
    const nodes = nodeLibrary.getReteNodes();
    for (const i of nodes) {
      this.getReteEditor().register(i);
      this.engine.getReteEngine().register(i);
    }
  };
}
