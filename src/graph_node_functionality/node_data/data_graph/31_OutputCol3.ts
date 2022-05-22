import { v4 } from "uuid";
import { Graphs } from "../../../interfaces/Graphs";

export const OutputCol3 = (): Graphs => ({
  id: "31",
  name: "Out Col3",
  type: "dataGraph",
  contentType: "graph",
  children: [],
  dataGraph: {
    id: "311",
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
        data: "#ffffff",
        dataType: "colorvec3",
        groups: {
          id: "default",
          name: "Default",
        },
        inputType: "colorpicker",
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
    parentId: "31",
    ioType: "output",
    operationType: "",
  },
});
