import {
  DataGraphScreen,
  FunctionsScreen,
  KernelNodeExplorer,
  KernelScreen,
  PreviewGraphScreen,
  PreviewScreen,
} from "../../../../kernel_node_editor_elements";

export const KERNEL_NODE_LAYOUT = [
  {
    type: "row",
    content: [
      {
        width: 30,
        type: "column",
        content: [KernelNodeExplorer],
      },
      {
        width: 70,
        type: "column",
        content: [
          {
            type: "stack",
            height: 60,
            content: [
              PreviewGraphScreen,
              FunctionsScreen,
              KernelScreen,
              DataGraphScreen,
            ],
          },
          {
            type: "row",
            height: 40,
            content: [PreviewScreen],
          },
        ],
      },
    ],
  },
];
