import { Socket } from "../packages/rete-1.4.4";

export type CONNECTION_TYPES = "color" | "grayscale" | "int" | "float" | "colorpick" | "int_vec2" | "float_vec2";

//Shadergraph connection types
export const GRAYSCALE_SOCKET = new Socket("grayscale");
export const COLOR_SOCKET = new Socket("color");

//Datagraph connection types
export const INT_SOCKET = new Socket("int");
export const FLOAT_SOCKET = new Socket("float");
export const COLORPICK_SOCKET = new Socket("colorpick");
export const INTVEC2_SOCKET = new Socket("int_vec2");
export const FLOATVEC2_SOCKET = new Socket("float_vec2");
