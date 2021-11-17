import { Socket } from "../packages/rete-1.4.4";

export type CONNECTION_TYPES =
  | "color"
  | "grayscale"
  | "number"
  | "number2"
  | "colorvec"
  | "colorvec3"
  | "lut"
  | "lut3"
  | "boolean";

//Shadergraph connection types
export const GRAYSCALE_SOCKET = new Socket("grayscale");
export const COLOR_SOCKET = new Socket("color");

//Datagraph connection types
export const NUMBER_SOCKET = new Socket("number");
export const NUMBER2_SOCKET = new Socket("number2");
export const COLORVEC_SOCKET = new Socket("colorvec");
export const COLORVEC3_SOCKET = new Socket("colorvec3");
export const LUT_SOCKET = new Socket("lut");
export const LUT3_SOCKET = new Socket("lut3");
export const BOOLEAN_SOCKET = new Socket("boolean");
