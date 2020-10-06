import { CONNECTION_TYPES } from "../ConnectionTypes";
import Rete from "./../../packages/rete-1.4.4";
import { Socket } from "./../../packages/rete-1.4.4/socket";

export default class Output extends Rete.Output {
  constructor(key: string, title: string, type: CONNECTION_TYPES) {
    super(key, title, new Socket(type));
  }
}
