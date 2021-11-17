import { CONNECTION_TYPES } from "../../graph_node_functionality/ConnectionTypes";

export class Connection {
  title: string;
  type: CONNECTION_TYPES;

  constructor(title: string, type: CONNECTION_TYPES) {
    this.title = title;
    this.type = type;
  }
}
