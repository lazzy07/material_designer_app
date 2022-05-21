import { v4 } from "uuid";
import { Graphs } from "../../../interfaces/Graphs";

export const OutputCol1 = (): Graphs => ({
  id: "30",
  name: "Out Col1",
  type: "dataGraph",
  contentType: "graph",
  children: [],
  dataGraph: {
    id: "301",
    data: [
      {
        id: "var_name",
        name: "Variable Name",
        data: "",
        dataType: "string",
        groups: {
          id: "default",
          name: "Default",
        },
        inputType: "input",
        type: "",
      },
      {
        id: "default",
        name: "Default Value",
        data: 0,
        dataType: "colorvec",
        groups: {
          id: "default",
          name: "Default",
        },
        inputType: "colorpicker",
        type: "",
      },
      {
        id: "label",
        name: "Label Name",
        data: "Data",
        dataType: "string",
        groups: {
          id: "default",
          name: "Default",
        },
        inputType: "input",
        type: "",
      },
    ],
    parentId: "30",
    ioType: "output",
    operationType: "",
  },
});
