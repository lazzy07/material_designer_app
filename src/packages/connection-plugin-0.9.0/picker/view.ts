import { Output, Input, Emitter } from "../../rete-1.4.4";
import { EditorView } from "../../rete-1.4.4/view/index";
import { EventsTypes } from "../../rete-1.4.4/events";
import { renderConnection, renderPathData, updateConnection } from "../utils";
import { Mouse } from "../../rete-1.4.4/view/area";

export class PickerView {
  private el: HTMLElement;
  shouldUpdate = true;
  mousePos: Mouse = {x: 0, y: 0}
  editorView: EditorView;

  constructor(
    private emitter: Emitter<EventsTypes>,
    editorView: EditorView
  ) {
    this.el = document.createElement("div");
    this.el.style.position = "absolute";
    this.editorView = editorView;
    this.editorView.area.appendChild(this.el);
  }

  updatePseudoConnection(io: Output | Input | null) {
    if (io !== null) {
      this.renderConnection(io);
    } else if (this.el.parentElement) {
      this.el.innerHTML = "";
    }
  }

  private getPoints(io: Output | Input): number[] {
    const mouse = this.editorView.area.mouse;

    if(this.shouldUpdate){
      this.mousePos = mouse;
    }

    if (!io.node) throw new Error("Node in output/input not found");

    const node = this.editorView.nodes.get(io.node);

    if (!node) throw new Error("Node view not found");

    const [x1, y1] = node.getSocketPosition(io);

    return io instanceof Output
      ? [x1, y1, this.mousePos.x, this.mousePos.y]
      : [this.mousePos.x, this.mousePos.y, x1, y1];
  }

  updateConnection(io: Output | Input) {
      const d = renderPathData(this.emitter, this.getPoints(io));
      updateConnection({ el: this.el, d });
  }

  renderConnection(io: Output | Input) {
    const d = renderPathData(this.emitter, this.getPoints(io));

    renderConnection({ el: this.el, d, io });
  }
}
