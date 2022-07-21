import { Graphs } from "../../../interfaces/Graphs";

export const ViewerColor = (): Graphs => ({
  id: "9",
  name: "Viewer Color",
  type: "shaderGraph",
  contentType: "graph",
  children: [],
  dataGraph: {
    id: "99",
    data: {},
    parentId: "9",
    ioType: "output",
    operationType: "color",
  },
});
