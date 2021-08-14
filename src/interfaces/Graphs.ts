import { Author } from "./Author";
import { DataGraph } from "./DataGraph";
import { KernelGraph } from "./KernelGraph";
import { ShaderGraph } from "./ShaderGraph";

export interface Graphs {
  id: string;
  name: string;
  type: GRAPH_TYPES;
  kernelGraph?: KernelGraph;
  shaderGraph?: ShaderGraph;
  dataGraph?: DataGraph;
  createdAt?: Date;
  author?: Author;
}

export type GRAPH_TYPES = "datagraph" | "shadergraph" | "kernelgraph";
