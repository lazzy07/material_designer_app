import { EditorElement } from "../EditorElements";

export const KernelNodeExplorer: EditorElement = {
  title: "Kernel Nodes",
  component: "kernelexplorer",
  type: "react-component",
};

export const PreviewScreen: EditorElement = {
  title: "Preview",
  component: "previewscreen",
  type: "react-component",
};

export const PreviewGraphScreen: EditorElement = {
  title: "Preview Graph",
  component: "previewgraph",
  type: "react-component",
};

export const FunctionsScreen: EditorElement = {
  title: "Functions",
  component: "functions",
  type: "react-component",
};

export const KernelScreen: EditorElement = {
  title: "Kernel",
  component: "kernel",
  type: "react-component",
};

export const DataGraphScreen: EditorElement = {
  title: "Data Graph",
  component: "datagraph",
  type: "react-component",
};

const allElements = [
  KernelNodeExplorer,
  PreviewScreen,
  PreviewGraphScreen,
  FunctionsScreen,
  KernelScreen,
  DataGraphScreen,
];

export const getElement = (title: string) => {
  for (let i of allElements) {
    if (i.title === title) {
      return i;
    }
  }
};
