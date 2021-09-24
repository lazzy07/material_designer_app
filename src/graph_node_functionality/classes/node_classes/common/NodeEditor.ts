import NodeEngine from "./NodeEngine";

export default abstract class NodeEditor {
  dom: HTMLDivElement;
  engine: NodeEngine;

  constructor(domElement: HTMLDivElement, engine: NodeEngine) {
    this.dom = domElement;
    this.engine = engine;
  }
}
