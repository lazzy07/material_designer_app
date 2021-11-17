import { CONNECTION_TYPES } from "../../graph_node_functionality/ConnectionTypes";
import { Connection } from "./Connection";

export default class Output extends Connection {
  constructor(title: string, type: CONNECTION_TYPES) {
    super(title, type);
  }
}
