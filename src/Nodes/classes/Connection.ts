import { CONNECTION_TYPES } from "../ConnectionTypes";

export abstract class Connection {
  name: string;
  type: CONNECTION_TYPES;

  constructor(name: string, type: CONNECTION_TYPES) {
    this.name = name;
    this.type = type;
  }
}
