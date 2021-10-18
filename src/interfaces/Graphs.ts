import { Author } from "./Author";
import { DataGraph } from "./DataGraph";
import { KernelGraph } from "./KernelGraph";
import { PackageElement } from "./PackageElement";
import { ShaderGraph } from "./ShaderGraph";

export interface Graphs extends PackageElement {
  type: GRAPH_TYPES;
  isPrimitive?: boolean;
  kernelGraph?: KernelGraph;
  shaderGraph?: ShaderGraph;
  dataGraph?: DataGraph;
  createdAt?: Date;
  author?: Author;
}

export type GRAPH_TYPES = "datagraph" | "shadergraph" | "kernelgraph";
