import React from "react";
import { Node, Control, Socket } from "../../packages/react-render-plugin-0.2.1";
import "../../css/node.css";

export class MaterialNode extends Node {
  state: any;
  props: any;

  constructor(props) {
    super(props);

    this.state = {};
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