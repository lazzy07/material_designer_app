import Rete, { Engine as ReteEngine } from "../../../../packages/rete-1.4.4";
import { ENGINE_VERSION } from "../../../../renderer/constants/Versions";

export default abstract class NodeEngine {
  private engineCore: ReteEngine;

  constructor() {
    this.engineCore = new ReteEngine("materialdesigner@" + ENGINE_VERSION);
  }

  listenToGraphEvents = () => {};

  getReteEngine = () => {
    return this.engineCore;
  };
}
