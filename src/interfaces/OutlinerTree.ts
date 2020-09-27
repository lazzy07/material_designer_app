export type OutlinerTypes =
  | "project"
  | "package"
  | "graph"
  | "datagraph"
  | "shadergraph";

export interface OutlinerElement {
  type: OutlinerTypes;
  name: string;
  children: OutlinerElement[];
}
