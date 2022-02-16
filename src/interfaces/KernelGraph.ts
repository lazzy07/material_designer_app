import { MaterialGraph } from "./MaterialGraph";

export interface KernelGraphData {
  kernel: string;
  functions: string;
}

export interface KernelGraph extends MaterialGraph {}
