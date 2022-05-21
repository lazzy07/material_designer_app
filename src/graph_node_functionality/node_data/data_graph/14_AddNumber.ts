import { Graphs } from "../../../interfaces/Graphs";

export const AddNumber = (): Graphs => ({
  id: "14",
  name: "Add Number",
  type: "dataGraph",
  contentType: "graph",
  children: [],
  dataGraph: {
    id: "141",
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
    parentId: "14",
    ioType: "process",
    operationType: "",
  },
});
