import { Graphs } from "../../../interfaces/Graphs";

export const SquarerootNumber = (): Graphs => ({
  id: "19",
  name: "Sqrt Number",
  type: "dataGraph",
  contentType: "graph",
  children: [],
  dataGraph: {
    id: "191",
    data: {
      default: {
        id: "default",
        name: "Default Value 1",
        data: 0,
        dataType: "number",
        groups: {
          id: "default",
          name: "Default",
        },
        inputType: "input_and_slider",
        type: "",
      },
    },
    parentId: "19",
    ioType: "process",
    operationType: "",
  },
});
