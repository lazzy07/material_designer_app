import { NodeEditor } from "../rete-1.4.4";
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

function install(editor: NodeEditor) {
  editor.bind("connectionpath");
  editor.bind("connectiondrop");
  editor.bind("connectionpick");
  editor.bind("resetconnection");

  const picker = new Picker(editor);
  const flow = new Flow(picker);
  const socketsParams = new WeakMap<Element, FlowParams>();
  let flowElement: Element | null = null;
  function pointerDown(this: HTMLElement, e: PointerEvent) {
    const flowParams = socketsParams.get(this);

    if (flowParams) {
      const { input, output } = flowParams;

      editor.view.container.dispatchEvent(new PointerEvent("pointermove", e));
      e.preventDefault();
      e.stopPropagation();
      console.log("clicked")
      flow.start({ input, output }, input || output);
    }
  }

  function pointerUp(this: Window, e: PointerEvent) {
    const flowEl = document.elementFromPoint(e.clientX, e.clientY);
    if (picker.io) {
      editor.trigger("connectiondrop", picker.io);
    }
    if (flowEl) {
      flowElement = flowEl;
      if((flowEl.className as any).baseVal === "main-path"){
        picker.view.shouldUpdate = false;

        const mouse = picker.view.editorView.area.mouse;
        const event = new CustomEvent("openmenu", {detail: {event: e, mouse} });
        console.log("event dispatched")
        // (event as any).mouse = mouse;
        window.dispatchEvent(event);
      }else{
        flow.complete(getMapItemRecursively(socketsParams, flowEl) || {});
      }
    }
  }

  window.addEventListener("blur", (e) => {
    picker.view.shouldUpdate = true;
    flow.complete(getMapItemRecursively(socketsParams, flowElement!) || {});
  });

  window.addEventListener("closemenu", () => {
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
