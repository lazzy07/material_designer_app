import React, { Component } from 'react'
import { defaultColors } from '../constants/Colors'
import { createGrid } from '../services/CreateGrid'
import Rete, { NodeEditor } from "../../packages/rete-1.4.4";
import ConnectionPlugin from "../../packages/connection-plugin-0.6.0"
import ReactRenderPlugin from "../../packages/react-render-plugin-0.2.1";
import NumComponent from '../../nodes/NumComponent';
import DropFileComponent from '../components/library_components/DropFileComponent';
import { DraggableItem } from '../../interfaces/DraggableItem';
import { NodeData } from '../../interfaces/NodeData';
import { EDITOR_VERSION, ENGINE_VERSION } from '../constants/Versions';


interface Props {
  dimensions: { width: number; height: number };
}

export default class GraphEditorComponent extends Component<Props> {
  private ref = React.createRef<HTMLDivElement>();
  engine = new Rete.Engine("materialdesigner@" + ENGINE_VERSION);
  editor: NodeEditor | null = null;

  onNodeDropped = (item: DraggableItem<NodeData>) => {
    console.log(item)
  }

  createEditor = () => {
    this.editor = new Rete.NodeEditor("materialdesigner@" + EDITOR_VERSION, this.ref.current!);

    this.editor.use(ConnectionPlugin);
    this.editor.use(ReactRenderPlugin);

    this.editor.on(["process", "nodecreated", "noderemoved", "connectioncreated", "connectionremoved"], async () => {
      await this.engine.abort();
      await this.engine.process(this.editor!.toJSON());
    });
  }

  componentDidMount = () => {
    this.createEditor();
  };


  render() {
    const { width, height } = this.props.dimensions;

    return (
      <DropFileComponent dropType={["node"]} onDropComplete={(item) => this.onNodeDropped(item)}>
        <div style={{
          backgroundColor: defaultColors.IMPORTANT_BACKGROUND_COLOR,
          height: "100%",
          width: "100%",
        }}>
          <div ref={this.ref} style={{ width, height }}></div>
          <div style={{ position: "absolute", width, height, top: 0 }}>
            {createGrid(defaultColors.DEFAULT_BACKGROUND_COLOR, width, height, 1.5, 10, 10)}
          </div>
        </div>
      </DropFileComponent>
    )
  }
}
