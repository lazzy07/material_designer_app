export interface EditorElement {
  title: string;
  type: "react-component";
  component: string;
  isClosable?: boolean;
}

export const NodeLibrary: EditorElement = {
  title: "Nodes",
  type: "react-component",
  component: "nodes",
};

export const HdriLibrary: EditorElement = {
  title: "HDRIs",
  type: "react-component",
  component: "hdris",
};

export const TextureLibrary: EditorElement = {
  title: "Textures",
  type: "react-component",
  component: "textures",
};

export const Preview3D: EditorElement = {
  title: "3D Preview",
  type: "react-component",
  component: "preview3d",
};

export const GraphEditor: EditorElement = {
  title: "Graph Editor",
  type: "react-component",
  component: "graphEditor",
};

export const NodePreview: EditorElement = {
  title: "Node Preview",
  type: "react-component",
  component: "nodePreview",
};

export const Outliner: EditorElement = {
  title: "Outliner",
  type: "react-component",
  component: "outliner",
};

export const NodeProps: EditorElement = {
  title: "Node Props",
  type: "react-component",
  component: "nodeProps",
};

export const GraphProps: EditorElement = {
  title: "Project Props",
  type: "react-component",
  component: "projectProps",
};

export const KernelEditor: EditorElement = {
  title: "Kernel Editor",
  type: "react-component",
  component: "kernelEditor",
};

export const FunctionsEditor: EditorElement = {
  title: "Functions Editor",
  type: "react-component",
  component: "functionsEditor",
};

export const InputOutputEditor: EditorElement = {
  title: "Input/Output",
  type: "react-component",
  component: "inputOutput",
};

export const CompilerOutput: EditorElement = {
  title: "Compiler Output",
  type: "react-component",
  component: "compilerOutput",
};

export const allElements = [
  NodeLibrary,
  HdriLibrary,
  TextureLibrary,
  Preview3D,
  GraphEditor,
  NodePreview,
  Outliner,
  NodeProps,
  GraphProps,
  KernelEditor,
  FunctionsEditor,
  CompilerOutput,
  InputOutputEditor,
];

export const getElement = (title: string) => {
  for (let i of allElements) {
    if (i.title === title) {
      return i;
    }
  }
};
