export interface EditorElement {
  title: string;
  type: "react-component";
  component: string;
}

export const NodeLibrary: EditorElement = {
  title: "Nodes",
  type: "react-component",
  component: "testItem"
};

export const HdriLibrary: EditorElement = {
  title: "HDRIs",
  type: "react-component",
  component: "testItem"
};

export const TextureLibrary: EditorElement = {
  title: "Textures",
  type: "react-component",
  component: "testItem"
};

export const Preview3D: EditorElement = {
  title: "3D Preview",
  type: "react-component",
  component: "testItem"
};

export const GraphEditor: EditorElement = {
  title: "Graph Editor",
  type: "react-component",
  component: "testItem"
};

export const NodePreview: EditorElement = {
  title: "Node Preview",
  type: "react-component",
  component: "testItem"
};

export const Outliner: EditorElement = {
  title: "Outliner",
  type: "react-component",
  component: "testItem"
};

export const NodeProps: EditorElement = {
  title: "Node Props",
  type: "react-component",
  component: "testItem"
};

export const ProjectProps: EditorElement = {
  title: "Project Props",
  type: "react-component",
  component: "testItem"
};

export const getElement = () => {};
