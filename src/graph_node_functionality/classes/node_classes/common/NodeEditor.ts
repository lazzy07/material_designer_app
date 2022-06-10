import { ipcRenderer } from "electron";
import { store } from "../../../../redux/store";
import { EDITOR_VERSION } from "../../../../renderer/constants/Versions";
import { NodeEditor as ReteNodeEditor } from "./../../../../packages/rete-1.4.4/editor";
import NodeEngine from "./NodeEngine";
import ConnectionPlugin from "../../../../packages/connection-plugin-0.9.0";
import ReactRenderPlugin from "../../../../packages/react-render-plugin-0.2.1";
import AreaPlugin from "../../../../packages/area-plugin";
import MaterialNode from "../../renderer/MaterialNode";
import { Mouse } from "../../../../packages/rete-1.4.4/view/area";
import NodeLibrary from "./NodeLibrary";
import { setSelectedNode } from "../../../../redux/actions/SystemActions";
import { Data } from "../../../../packages/rete-1.4.4/core/data";
import { editGraphData } from "../../../../redux/actions/GraphActions";
import { Store } from "../../../../redux/reducers";
import { IpcMessages } from "../../../../IpcMessages";
import { GRAPH_TYPES } from "../../../../interfaces/Graphs";

export default abstract class NodeEditor {
  dom: HTMLDivElement;
  engine: NodeEngine;
  private editorCore: ReteNodeEditor;
  mouse: Mouse = { x: 0, y: 0 };
  nodeEditorType: GRAPH_TYPES;

  constructor(
    domElement: HTMLDivElement,
    engine: NodeEngine,
    nodeEditorType: GRAPH_TYPES
  ) {
    this.dom = domElement;
    this.engine = engine;
    this.nodeEditorType = nodeEditorType;
    this.editorCore = new ReteNodeEditor(
      "materialdesigner@" + EDITOR_VERSION,
      this.dom
    );
    this.onMouseMove();
  }

  abstract registerNodes(nodeLibrary: NodeLibrary): void;

  getReteEditor = () => {
    return this.editorCore;
  };

  getReteEngine = () => {
    return this.engine.getReteEngine();
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
      ["nodecreated", "noderemoved", "connectioncreated", "connectionremoved"],
      async () => {
        const engine = this.engine.getReteEngine();
        await engine.abort();
        await engine.process(this.editorCore!.toJSON());
      }
    );

    this.editorCore.on("nodecreated", (node) => {
      ipcRenderer.send(IpcMessages.UPDATE_GRAPH, {
        updateType: "createNode",
        update: JSON.stringify(node),
        selectedGraphType: this.nodeEditorType,
      });
    });

    this.editorCore.on("noderemoved", (node) => {
      ipcRenderer.send(IpcMessages.UPDATE_GRAPH, {
        updateType: "removeNode",
        update: JSON.stringify(node),
        selectedGraphType: this.nodeEditorType,
      });
    });

    this.editorCore.on("connectioncreated", (connection) => {
      ipcRenderer.send(IpcMessages.UPDATE_GRAPH, {
        updateType: "addConnection",
        update: JSON.stringify(connection),
        selectedGraphType: this.nodeEditorType,
      });
    });

    this.editorCore.on("connectionremoved", (connection) => {
      ipcRenderer.send(IpcMessages.UPDATE_GRAPH, {
        updateType: "removeConnection",
        update: JSON.stringify(connection),
        selectedGraphType: this.nodeEditorType,
      });
    });

    this.editorCore.on(
      ["nodecreated", "noderemoved", "connectioncreated", "connectionremoved"],
      () => {
        const json = this.editorCore!.toJSON();

        const state: Store = store.getState();
        const selectedItems = state.system.selectedItems;
        store.dispatch(
          editGraphData(selectedItems.graphId, this.nodeEditorType, json)
        );
      }
    );
  };

  loadFromStore = (data: Data) => {
    this.editorCore.fromJSON(data);
  };

  handleSelectNodes = () => {
    this.editorCore.on("nodeselected", (e) => {
      store.dispatch(setSelectedNode(e.id, this.nodeEditorType));
    });
  };

  onMouseMove = () => {
    this.editorCore.on("mousemove", (mouse) => {
      this.mouse = mouse;
    });
  };
}
