import { Graphs } from "../../../interfaces/Graphs";

export const SubstractNumber = (): Graphs => ({
  id: "15",
  name: "Substract Number",
  type: "dataGraph",
  contentType: "graph",
  children: [],
  dataGraph: {
    id: "151",
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
    parentId: "15",
    ioType: "process",
    operationType: "",
  },
});
