import { Graphs } from "../../../interfaces/Graphs";

export const PowerNumber = (): Graphs => ({
  id: "18",
  name: "Power Number",
  type: "dataGraph",
  contentType: "graph",
  children: [],
  dataGraph: {
    id: "181",
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
      default2: {
        id: "default2",
        name: "Default Value 2",
        data: 1,
        dataType: "number",
        groups: {
          id: "default",
          name: "Default",
        },
        inputType: "input_and_slider",
        type: "",
      },
    },
    parentId: "18",
    ioType: "process",
    operationType: "",
  },
});
