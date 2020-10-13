import { NodeEditor, Node } from "../rete-1.4.4";
import {
  renderConnection,
  renderPathData,
  updateConnection,
  getMapItemRecursively,
} from "./utils";
import { Picker } from "./picker";
import { Flow, FlowParams } from "./flow";
import "./events";
import "./index.sass";
import { NodeView } from './../rete-1.4.4/view/node';
import { CLOSE_MENU, CREATE_NODE_BY_DRAGGING, OPEN_MENU } from "./windowevents";

function install(editor: NodeEditor) {
  editor.bind("connectionpath");
  editor.bind("connectiondrop");
  editor.bind("connectionpick");
  editor.bind("resetconnection");

  const picker = new Picker(editor);
  const flow = new Flow(picker);
  const socketsParams = new WeakMap<Element, FlowParams>();
  let flowElement: Element | null = null;
  let flowParams: FlowParams | undefined;

  function pointerDown(this: HTMLElement, e: PointerEvent) {
    flowParams = socketsParams.get(this);
    console.log("pointer down")
    if (flowParams) {
      const { input, output } = flowParams;
      editor.view.container.dispatchEvent(new PointerEvent("pointermove", e));
      e.preventDefault();
      e.stopPropagation();
      flow.start({ input, output }, input || output);
    }
  }

  function pointerUp(this: Window, e: PointerEvent) {
    console.log("pointer up")
    const flowEl = document.elementFromPoint(e.clientX, e.clientY);
    if (picker.io) {
      editor.trigger("connectiondrop", picker.io);
    }

    if (flowEl) {
        flowElement = flowEl;
        if((flowEl.className as any).baseVal === "main-path"){
          picker.view.shouldUpdate = false;

          const mouse = picker.view.editorView.area.mouse;
          const event = new CustomEvent(OPEN_MENU, {detail: {event: e, mouse} });
          window.dispatchEvent(event);
      }else{
        flow.complete(getMapItemRecursively(socketsParams, flowEl) || {});
      }
    }
  }

  window.addEventListener(CREATE_NODE_BY_DRAGGING, (e: any) => {
    const node: Node = e.detail.node;

    node.inputs.forEach(ele => {
      if(flowParams?.output){
        if(ele.key === flowParams.output.key){
          editor.connect(flowParams.output, ele)
        }
      }
    })
  })



  window.addEventListener("blur", (_) => {
    picker.view.shouldUpdate = true;
    flow.complete(getMapItemRecursively(socketsParams, flowElement!) || {});
  });

  window.addEventListener(CLOSE_MENU, () => {
    picker.view.shouldUpdate = true;
    flow.complete(getMapItemRecursively(socketsParams, flowElement!) || {});
  })

  editor.on("resetconnection", () => {
    flow.complete()
  });

  editor.on("rendersocket", ({ el, input, output }) => {
    socketsParams.set(el, { input, output });

    el.removeEventListener("pointerdown", pointerDown);
    el.addEventListener("pointerdown", pointerDown);
  });

  window.addEventListener("pointerup", pointerUp);

  editor.on("renderconnection", ({ el, connection, points }) => {
      const d = renderPathData(editor, points, connection);
      renderConnection({ el, d, connection });
  });

  editor.on("updateconnection", ({ el, connection, points }) => {
    
      const d = renderPathData(editor, points, connection);
      updateConnection({ el, d });
  });

  editor.on("destroy", () => {
    window.removeEventListener("pointerup", pointerUp);
  });
}

export default {
  name: "connection",
  install,
};
export { defaultPath } from "./utils";
