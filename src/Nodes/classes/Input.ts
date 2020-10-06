import Rete, { Socket } from "./../../packages/rete-1.4.4";
import { CONNECTION_TYPES } from "../ConnectionTypes";

export default class Input extends Rete.Input {
  constructor(key: string, title: string, type: CONNECTION_TYPES) {
    super(key, title, new Socket(type));
  }
}
