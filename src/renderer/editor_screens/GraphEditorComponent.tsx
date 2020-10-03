import React, { Component } from 'react'
import { defaultColors } from '../constants/Colors'
import { createGrid } from '../services/CreateGrid'
import Rete from "../../packages/rete-1.4.4";
import ConnectionPlugin from "../../packages/connection-plugin-0.6.0"
import ReactRenderPlugin from "../../packages/react-render-plugin-0.2.1";
import NumComponent from '../../nodes/NumComponent';


interface Props {
  dimensions: { width: number; height: number };
}

export default class GraphEditorComponent extends Component<Props> {
  private ref = React.createRef<HTMLDivElement>();

  componentDidMount = () => {
    const engine = new Rete.Engine('demo@0.1.0');
    const editor = new Rete.NodeEditor("materialdesigner@1.0.0", this.ref.current!);

    editor.use(ConnectionPlugin);
    editor.use(ReactRenderPlugin);


    const numComponent = new NumComponent();
    editor.register(numComponent);
    engine.register(numComponent);

    editor.on(["process", "nodecreated", "noderemoved", "connectioncreated", "connectionremoved"], async () => {
      await engine.abort();
      await engine.process(editor.toJSON());
    });
  };


  render() {
    return (
      <div style={{
        backgroundColor: defaultColors.IMPORTANT_BACKGROUND_COLOR,
        height: "100%",
        width: "100%",
      }}>
        <div ref={this.ref} style={{ width: this.props.dimensions.width, height: this.props.dimensions.height }}></div>
        <div style={{ position: "absolute", width: this.props.dimensions.width, height: this.props.dimensions.height, top: 0 }}>
          {createGrid(defaultColors.DEFAULT_BACKGROUND_COLOR, this.props.dimensions.width, this.props.dimensions.height, 1.5, 10, 10)}
        </div>
      </div>
    )
  }
}
