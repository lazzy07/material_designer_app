import { GraphPackage } from "../../interfaces/GraphPackage";
import { OutlinerElement } from "../../interfaces/OutlinerTree";

export const getTreeData = (
  projectId: string,
  projectName: string,
  graphs: GraphPackage[]
) => {
  let elements: OutlinerElement = {
    id: projectId,
    name: projectName.split(".")[0],
    type: "project",
    children: [],
    extended: true,
  };

  for (let pkg of graphs) {
    let packageElem: OutlinerElement = {
      id: pkg.id,
      name: pkg.name,
      type: "package",
      children: [],
      selected: false,
      extended: true
    };
    for (let i of pkg.graphs) {
      let graphElem: OutlinerElement = {
        id: i.id,
        name: i.name,
        type: "graph",
        children: [],
        selected: false,
        extended: true
      };
      // graphElem.children.push({
      //   id: i.shaderGraph.id,
      //   name: "Shader Graph",
      //   type: "shadergraph",
      //   children: [],
      // });
      graphElem.children.push({
        id: i.id + "data",
        name: "Data Graph",
        type: "datagraph",
        children: [],
        selected: false
      });
      packageElem.children.push(graphElem);
    }

    elements.children.push(packageElem);
  }
  return elements;
};
