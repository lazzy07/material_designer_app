import { Graphs } from "../../../../interfaces/Graphs";
import { Component } from "../../../../packages/rete-1.4.4";
import GraphReference from "./GraphReference";

export default abstract class NodeLibrary {
  reteNodes: GraphReference[] = [];

  abstract initReteNodes(nodes: Graphs[]): Component[];

  abstract getNodes(): Graphs[];

  getReteNodes() {
    return this.reteNodes;
  }
}
