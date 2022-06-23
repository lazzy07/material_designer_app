import React from "react";
import { NodePropertyData } from "../../graph_node_functionality/interfaces/NodePropertyData";
import InputAndSlider1 from "../components/graph_property_inputs/InputAndSlider1";
import InputAndSlider2 from "../components/graph_property_inputs/InputAndSlider2";
import Button from "../components/graph_property_inputs/Button";
import InputNumber from "../components/graph_property_inputs/InputNumber";
import InputString from "../components/graph_property_inputs/InputString";
import Slider1 from "../components/graph_property_inputs/Slider1";
import Slider2 from "../components/graph_property_inputs/Slider2";
import Lut1 from "../components/graph_property_inputs/Lut1";
import { v4 } from "uuid";
import Lut3 from "../components/graph_property_inputs/Lut3";
import ColorPicker1 from "../components/graph_property_inputs/ColorPicker1";
import ColorPicker3 from "../components/graph_property_inputs/ColorPicker3";
import { store } from "../../redux/store";
import { Graphs, GRAPH_TYPES } from "../../interfaces/Graphs";
import { Data, NodeData, NodesData } from "../../packages/rete-1.4.4/core/data";
import { editGraphNodeData } from "../../redux/actions/GraphActions";
import { ColorLUT } from "../../interfaces/ColorLutData";
import Dropdown from "../components/graph_property_inputs/Dropdown";
import { Store } from "../../redux/reducers";
// import Switch from "../components/graph_property_inputs/Switch";
// import Dropdown from "../components/graph_property_inputs/Dropdown";

export const renderDatagraphElement = (
  nodeProperty: NodePropertyData<any>,
  index: number,
  graph: Graphs,
  selectedNode: NodeData,
  selectedGraphType: GRAPH_TYPES,
  id?: string,
  elem?: NodeData
) => {
  if (nodeProperty.isHidden) {
    return <div></div>;
  }

  return (
    <div key={index}>
      <div
        style={{
          padding: "3px 10px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>{nodeProperty.name}</div>
      </div>
      <div>
        {selectGraphElement(
          nodeProperty,
          graph,
          selectedNode,
          selectedGraphType,
          id,
          elem
        )}
      </div>
    </div>
  );
};

const selectGraphElement = (
  nodeProperty: NodePropertyData<any>,
  graph: Graphs,
  selectedNode: NodeData,
  selectedGraphType: GRAPH_TYPES,
  id?: string,
  elem?: NodeData
) => {
  const dataType = nodeProperty.dataType;
  const type = nodeProperty.inputType;

  if (dataType === "number" && type === "input") {
    return (
      <InputNumber
        value={nodeProperty.data}
        onChange={(val) =>
          onChangeData<number>(
            val,
            nodeProperty,
            graph,
            selectedNode,
            selectedGraphType,
            id,
            elem
          )
        }
      />
    );
  } else if (dataType === "number" && type === "input_and_slider") {
    return (
      <InputAndSlider1
        onChange={(val) =>
          onChangeData<number>(
            val,
            nodeProperty,
            graph,
            selectedNode,
            selectedGraphType,
            id,
            elem
          )
        }
        value={nodeProperty.data}
      />
    );
  } else if (dataType === "number2" && type === "input_and_slider") {
    return (
      <InputAndSlider2
        onChange={(val) =>
          onChangeData<number[]>(
            val,
            nodeProperty,
            graph,
            selectedNode,
            selectedGraphType,
            id,
            elem
          )
        }
        value={nodeProperty.data}
      />
    );
  } else if (dataType === "boolean" && type === "button") {
    return (
      <Button
        title={nodeProperty.data === true ? "True" : "False"}
        onClick={() =>
          onChangeData<boolean>(
            !nodeProperty.data,
            nodeProperty,
            graph,
            selectedNode,
            selectedGraphType,
            id,
            elem
          )
        }
      />
    );
  } else if (dataType === "string" && type === "input") {
    return (
      <InputString
        value={nodeProperty.data}
        onChange={(val) =>
          onChangeData<string>(
            val,
            nodeProperty,
            graph,
            selectedNode,
            selectedGraphType,
            id,
            elem
          )
        }
      />
    );
  } else if (dataType === "number" && type === "dropdown") {
    return (
      <Dropdown
        value={nodeProperty.data.value}
        options={nodeProperty.data.options}
        onChange={(val) =>
          onChangeDataElem(
            val,
            nodeProperty,
            graph,
            selectedNode,
            selectedGraphType
          )
        }
      />
    );
  } else if (dataType === "number" && type === "slider") {
    return (
      <Slider1
        value={nodeProperty.data}
        onChange={(val) =>
          onChangeData<number>(
            val,
            nodeProperty,
            graph,
            selectedNode,
            selectedGraphType,
            id,
            elem
          )
        }
      />
    );
  } else if (dataType === "number2" && type === "slider") {
    return (
      <Slider2
        value={nodeProperty.data}
        onChange={(val) =>
          onChangeData<number[]>(
            val,
            nodeProperty,
            graph,
            selectedNode,
            selectedGraphType,
            id,
            elem
          )
        }
      />
    );
  } else if (dataType === "lut" && type === "lut") {
    return (
      <Lut1
        id={v4()}
        colors={nodeProperty.data}
        onChangeLut={(val) =>
          onChangeData<ColorLUT[]>(
            val,
            nodeProperty,
            graph,
            selectedNode,
            selectedGraphType,
            id,
            elem
          )
        }
      />
    );
  } else if (dataType === "lut3" && type === "lut") {
    return (
      <Lut3
        id={v4()}
        colors={nodeProperty.data}
        onChangeLut={(val) =>
          onChangeData<ColorLUT[]>(
            val,
            nodeProperty,
            graph,
            selectedNode,
            selectedGraphType,
            id,
            elem
          )
        }
      />
    );
  } else if (dataType === "colorvec" && type === "colorpicker") {
    return (
      <ColorPicker1
        value={nodeProperty.data}
        onChange={(val) =>
          onChangeData<number>(
            val,
            nodeProperty,
            graph,
            selectedNode,
            selectedGraphType,
            id,
            elem
          )
        }
        id={v4()}
      />
    );
  } else if (dataType === "colorvec3" && type === "colorpicker") {
    return (
      <ColorPicker3
        value={nodeProperty.data}
        onChange={(val) =>
          onChangeData<string>(
            val,
            nodeProperty,
            graph,
            selectedNode,
            selectedGraphType,
            id,
            elem
          )
        }
        id={v4()}
      />
    );
  }
  // else if (dataType === "boolean" && type === "switch") {
  //   return <Switch />;
  // }
};

function onChangeData<T>(
  value: T,
  nodeProperty: NodePropertyData<T>,
  selectedGraph: Graphs,
  selectedNode: NodeData,
  selectedGraphType: GRAPH_TYPES,
  id?: string, //for secondary nodes
  elem?: NodeData
) {
  const state = store.getState() as Store;
  const dataGraph = selectedGraph![selectedGraphType];
  const reteGraph = dataGraph!.data as Data;
  const selectedNodeData = reteGraph.nodes[selectedNode.id];
  const data: Graphs = selectedNodeData.data as any;

  if (!data.dataGraph!.isSecondary) {
    const nodePrimitiveData = data["dataGraph"]!.data as {
      [id: string]: NodePropertyData<any>;
    };

    nodePrimitiveData[nodeProperty.id].data = value;

    store.dispatch(
      editGraphNodeData(
        state.system.selectedItems.graphId,
        selectedGraphType,
        selectedNodeData,
        selectedNode.id
      )
    );
  } else {
    const nodes: NodesData = (data.dataGraph!.data as any).nodes;
    const sNode: Graphs = nodes[elem!.id].data as any;

    const dataGraph = sNode.dataGraph!;
    const dt = dataGraph.data as { [id: string]: NodePropertyData<any> };
    dt[id!].data = value;

    store.dispatch(
      editGraphNodeData(
        state.system.selectedItems.graphId,
        "dataGraph",
        selectedNodeData,
        selectedNode.id,
        elem!.id
      )
    );
  }
}

function onChangeDataElem(
  value: any,
  nodeProperty: NodePropertyData<any>,
  selectedGraph: Graphs,
  selectedNode: NodeData,
  selectedGraphType: GRAPH_TYPES
) {
  const dataGraph = selectedGraph![selectedGraphType];
  const reteGraph = dataGraph!.data as Data;
  const selectedNodeData = reteGraph.nodes[selectedNode.id];
  const data: Graphs = selectedNodeData.data as any;

  const nodePrimitiveData = data["dataGraph"]!.data as {
    [id: string]: NodePropertyData<any>;
  };

  for (const i of Object.values(nodePrimitiveData)) {
    if (i.id === nodeProperty.id) {
      i.data.value = value;
    }
  }
  const state = store.getState() as Store;

  store.dispatch(
    editGraphNodeData(
      state.system.selectedItems.graphId,
      "dataGraph",
      selectedNodeData,
      selectedNode.id
    )
  );
}
