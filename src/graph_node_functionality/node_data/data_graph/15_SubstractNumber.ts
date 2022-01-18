import { Graphs } from "../../../interfaces/Graphs";

export const SubstractNumber: Graphs = {
  id: "15",
  name: "Substract Number",
  type: "dataGraph",
  contentType: "graph",
  children: [],
  dataGraph: {
    id: "151",
    data: [
      {
        id: "1511",
        name: "Default Value 1",
        data: 0,
        dataType: "number",
        groups: {
          id: "15111",
          name: "Default",
        },
        inputType: "input_and_slider",
        type: "",
      },
      {
        id: "1512",
        name: "Default Value 2",
        data: 0,
        dataType: "number",
        groups: {
          id: "15111",
          name: "Default",
        },
        inputType: "input_and_slider",
        type: "",
      },
    ],
    parentId: "15",
    ioType: "process",
    operationType: "",
  },
};
