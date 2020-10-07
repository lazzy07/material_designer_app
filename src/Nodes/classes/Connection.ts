import { CONNECTION_TYPES } from "../ConnectionTypes";

export class Connection {
  title: string;
  type: CONNECTION_TYPES;

  constructor(title: string, type: CONNECTION_TYPES) {
    this.title = title;
    this.type = type;
  }
}
