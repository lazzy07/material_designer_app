import Rete, { Socket } from "../../packages/rete-1.4.4";
import { CONNECTION_TYPES } from "../ConnectionTypes";
import { Connection } from "./Connection";

export default class InputConnection extends Connection {
  constructor(title: string, type: CONNECTION_TYPES) {
    super(title, type);
  }
}
