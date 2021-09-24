import NodeEngine from "./NodeEngine";

export default abstract class NodeLibrary {
  engine: NodeEngine;

  constructor(engine: NodeEngine) {
    this.engine = engine;
  }
}
