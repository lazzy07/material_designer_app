import { Graphs } from "../../../interfaces/Graphs";

export const ViewerGrayscale = (): Graphs => ({
  id: "10",
  name: "Viewer Grayscale",
  type: "shaderGraph",
  contentType: "graph",
  children: [],
  dataGraph: {
    id: "101",
    data: {},
    parentId: "10",
    ioType: "output",
    operationType: "color",
  },
});
