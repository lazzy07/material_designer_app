import { v4 } from "uuid";
import { Graphs } from "../../../interfaces/Graphs";

export const OutputBool = (): Graphs => ({
  id: "32",
  name: "Out Bool",
  type: "dataGraph",
  contentType: "graph",
  children: [],
  dataGraph: {
    id: "321",
    data: {
      var_name: {
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
      default: {
        id: "default",
        name: "Default Value",
        data: false,
        dataType: "boolean",
        groups: {
          id: "default",
          name: "Default",
        },
        inputType: "button",
        type: "",
      },
      label: {
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
    },
    parentId: "32",
    ioType: "output",
    operationType: "",
  },
});
