import { Graphs } from "./Graphs";

export interface GraphPackage {
  id: string;
  name: string;
  graphs: Graphs[];
  author?: string;
  createdAt?: Date;
}
