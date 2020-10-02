import { FlowParams } from "./flow";
import { Connection } from "../rete-1.4.4";
export interface FlowElement extends Element {
  _reteConnectionPlugin: FlowParams;
}

declare module "../rete-1.4.4/events" {
  interface EventsTypes {
    connectionpath: {
      points: number[];
      connection: Connection;
      d: string;
    };
  }
}
