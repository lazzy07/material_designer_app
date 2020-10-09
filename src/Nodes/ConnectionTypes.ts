import { Socket } from "../packages/rete-1.4.4";

export type CONNECTION_TYPES = "color" | "grayscale";

export const GRAYSCALE_SOCKET = new Socket("grayscale");
export const COLOR_SOCKET = new Socket("color");
