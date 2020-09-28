import { DataGraph } from "./DataGraph";
import { ShaderGraph } from "./ShaderGraph";

export interface Graphs {
  id: string;
  name: string;
  shaderGraph: ShaderGraph;
  dataGraph: DataGraph;
  createdAt?: Date;
  author?: string;
}
