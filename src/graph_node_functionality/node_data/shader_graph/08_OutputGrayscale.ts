import { Graphs } from "../../../interfaces/Graphs";

export const OutputGrayscale = (): Graphs => ({
  id: "8",
  name: "Grayscale Output",
  type: "shaderGraph",
  contentType: "graph",
  children: [],
  dataGraph: {
    id: "88",
    data: [],
    parentId: "8",
    ioType: "output",
    operationType: "grayscale",
  },
});
