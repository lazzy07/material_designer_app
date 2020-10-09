import { Connection, Input, Output } from "../rete-1.4.4";

declare module "../rete-1.4.4/events" {
  interface EventsTypes {
    connectionpath: {
      points: number[];
      connection: Connection;
      d: string;
    };
    connectiondrop: Input | Output;
    connectionpick: Input | Output;
    resetconnection: void;
  }
}
