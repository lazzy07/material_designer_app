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
    data: [
      {
        id: "var_name",
        name: "Variable Name",
        data: "",
        dataType: "string",
        groups: {
          id: "1",
          name: "Default",
        },
        inputType: "input",
        type: "",
      },
      {
        id: "3211",
        name: "Default Value",
        data: false,
        dataType: "boolean",
        groups: {
          id: "32111",
          name: "Default",
        },
        inputType: "button",
        type: "",
      },
      {
        id: "id",
        name: "ID",
        data: v4(),
        dataType: "string",
        groups: {
          id: "32111",
          name: "Default",
        },
        inputType: "input",
        type: "",
        isHidden: true,
      },
    ],
    parentId: "32",
    ioType: "output",
    operationType: "",
  },
});
