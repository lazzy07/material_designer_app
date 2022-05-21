import { Graphs } from "../../../interfaces/Graphs";

export const MultiplyNumber = (): Graphs => ({
  id: "16",
  name: "Multiply Number",
  type: "dataGraph",
  contentType: "graph",
  children: [],
  dataGraph: {
    id: "161",
    data: [
      {
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
      {
        id: "default2",
        name: "Default Value 2",
        data: 0,
        dataType: "number",
        groups: {
          id: "default",
          name: "Default",
        },
        inputType: "input_and_slider",
        type: "",
      },
    ],
    parentId: "16",
    ioType: "process",
    operationType: "",
  },
});
