import { EditorElement } from "../EditorElements";

export const KernelNodeExplorer: EditorElement = {
  title: "Kernel Nodes",
  component: "kernelexplorer",
  type: "react-component",
};

const allElements = [KernelNodeExplorer];

export const getElement = (title: string) => {
  for (let i of allElements) {
    if (i.title === title) {
      return i;
    }
  }
};
