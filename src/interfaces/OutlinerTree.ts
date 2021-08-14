export type OutlinerTypes =
  | "project"
  | "package"
  | "materialgraph"
  | "datagraph"
  | "shadergraph"
  | "kernelgraph";

export interface OutlinerElement {
  id: string;
  type: OutlinerTypes;
  name: string;
  children: OutlinerElement[];
  selected?: boolean;
  extended?: boolean;
}
