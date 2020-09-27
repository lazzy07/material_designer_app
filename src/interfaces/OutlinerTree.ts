export type OutlinerTypes =
  | "project"
  | "package"
  | "graph"
  | "datagraph"
  | "shadergraph";

export interface OutlinerElement {
  id: string;
  type: OutlinerTypes;
  name: string;
  children: OutlinerElement[];
}
