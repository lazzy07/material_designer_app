import React from "react";
import { Node, Control, Socket } from "../../packages/react-render-plugin-0.2.1";
import "../../packages/react-render-plugin-0.2.1/styles.sass"
import "../../renderer/scss/nodes.scss"

export default class MaterialNode extends React.Component {
  state: any;
  props: any;

  constructor(props: any) {
    super(props);

    this.state = {};
  }

  static getDerivedStateFromProps({ node, editor }) {
    return {
      outputs: Array.from(node.outputs.values()),
      controls: Array.from(node.controls.values()),
      inputs: Array.from(node.inputs.values()),
      selected: editor.selected.contains(node) ? 'selected' : ''
    }
  }

  componentDidMount() { }

  render() {
    const { node, bindSocket, bindControl } = this.props;
    const { outputs, controls, inputs, selected } = this.state;
    return (
      <div className={`_node ${selected} ${node.meta.type}`}>
        <div className="title">{node.name}</div>
        {/* Outputs */}
        {outputs.map(output => (
          <div className={`output ${output.socket.name}`} key={output.key}>
            <div className={`output-title ${output.socket.name}-title`}>
              {output.name}
            </div>
            <Socket
              type="output"
              socket={output.socket}
              io={output}
              innerRef={bindSocket}
            />
          </div>
        ))}
        {/* Controls */}
        {controls.map(control => (
          <Control
            className="control"
            key={control.key}
            control={control}
            innerRef={bindControl}
          />
        ))}
        {/* Inputs */}
        {inputs.map(input => (
          <div className={`input ${input.socket.name}`} key={input.key}>
            <Socket
              type="input"
              socket={input.socket}
              io={input}
              innerRef={bindSocket}
            />
            {!input.showControl() && (
              <div className={`input-title ${input.socket.name}-title`}>
                {input.name}
              </div>
            )}
            {input.showControl() && (
              <Control
                className="input-control"
                control={input.control}
                innerRef={bindControl}
              />
            )}
          </div>
        ))}
      </div>
    );
  }
}