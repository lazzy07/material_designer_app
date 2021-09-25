import { Graphs } from "../../../../interfaces/Graphs";

export default abstract class NodeLibrary {
  abstract getNodes(): Graphs[];
}
