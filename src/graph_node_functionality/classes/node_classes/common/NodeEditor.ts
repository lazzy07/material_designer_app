import { store } from "../../../../redux/store";
import { EDITOR_VERSION } from "../../../../renderer/constants/Versions";
import { NodeEditor as ReteNodeEditor } from "./../../../../packages/rete-1.4.4/editor";
import NodeEngine from "./NodeEngine";
import ConnectionPlugin from "../../../../packages/connection-plugin-0.9.0";
import ReactRenderPlugin from "../../../../packages/react-render-plugin-0.2.1";
import AreaPlugin from "../../../../packages/area-plugin";
import MaterialNode from "../../renderer/MaterialNode";
import { Mouse } from "../../../../packages/rete-1.4.4/view/area";

export default abstract class NodeEditor {
  dom: HTMLDivElement;
  engine: NodeEngine;
  private editorCore: ReteNodeEditor;

  constructor(domElement: HTMLDivElement, engine: NodeEngine) {
    this.dom = domElement;
    this.engine = engine;
    this.editorCore = new ReteNodeEditor(
      "materialdesigner@" + EDITOR_VERSION,
      this.dom
    );
  }

  getReteEditor = () => {
    return this.editorCore;
  };

  enableEditorPlugins = () => {
    this.editorCore.use(ConnectionPlugin);
    this.editorCore.use(ReactRenderPlugin, { component: MaterialNode });
    this.editorCore.use(AreaPlugin as any, {
      scaleExtent: { min: 0.1, max: 1.5 },
    });

    this.editorCore.view.area.el.style.height =
      store.getState().preferences.graphSettings.canvasSize.y + "px";
    this.editorCore.view.area.el.style.width =
      store.getState().preferences.graphSettings.canvasSize.x + "px";
  };

  onEditorChange = () => {
    this.editorCore.on(
      [
        "process",
        "nodecreated",
        "noderemoved",
        "connectioncreated",
        "connectionremoved",
      ],
      async () => {
        const engine = this.engine.getReteEngine();
        await engine.abort();
        await engine.process(this.editorCore!.toJSON());
      }
    );
  };

  onMouseMove = (fn: (mouse: Mouse) => void) => {
    this.editorCore.on("mousemove", fn);
  };
}
