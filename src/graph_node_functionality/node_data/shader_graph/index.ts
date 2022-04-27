import { Viewer } from "./09_Viewer";
import { OutputGrayscale } from "./08_OutputGrayscale";
import { OutputColor } from "./07_OutputColor";
import { KernelOutputGrayscale } from "./06_KernelOutputGrayscale";
import { KernelOutputColor } from "./05_KernelOutputColor";
import { KernelInputGrayscale } from "./04_KernelInputGrayscale";
import { KernelInputColor } from "./03_KernelInputColor";
import { InputGrayscale } from "./02_InputGrayscale";
import { InputColor } from "./01_InputColor";

const SHADER_NODES = [
  InputColor(),
  InputGrayscale(),
  KernelInputColor(),
  KernelInputGrayscale(),
  KernelOutputColor(),
  KernelOutputGrayscale(),
  OutputColor(),
  OutputGrayscale(),
  Viewer(),
];

export default SHADER_NODES;
