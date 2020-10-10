import React from "react";
import { Control, Socket } from "../../packages/react-render-plugin-0.2.1";
import "../../packages/react-render-plugin-0.2.1/styles.sass"
import { defaultColors } from "../../renderer/constants/Colors";
import "../../renderer/scss/nodes.scss"
import { getNodeColor, getNodeConnectionColors } from "../../renderer/services/NodeColors";

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
      selected: editor.selected.contains(node) ? 'selected' : '',
    }
  }

  componentDidMount() { }

  render() {
    const { node, bindSocket, bindControl } = this.props;
    const { outputs, controls, inputs, selected } = this.state;

    const { type } = node.meta;
    const color = getNodeColor(type);
    const borderRadius = 12;

    return (
      <div
        className={`_node ${selected} ${node.meta.type}`}
        style={{
          backgroundColor: defaultColors.IMPORTANT_BACKGROUND_COLOR,
          minWidth: 180,
          borderTopLeftRadius: borderRadius,
          borderTopRightRadius: borderRadius,
          borderTop: `0px solid black`,
          borderLeft: selected ? `2px solid ${color}` : undefined,
          borderRight: selected ? `2px solid ${color}` : undefined,
          borderBottom: selected ? `2px solid ${color}` : undefined,
          boxShadow: selected ? `0 0 6px 6px ${color}30` : undefined,
        }}
      >
        <div
          style={{
            color: defaultColors.NODE_HEADER_FONT_COLOR,
            backgroundColor: color,
            borderTopRightRadius: borderRadius ? borderRadius - 3 : 0,
            borderTopLeftRadius: borderRadius ? borderRadius - 3 : 0,
            padding: 7,
            fontWeight: "bolder",
            fontSize: 20
          }}
        >
          {node.name}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 6, paddingBottom: 6 }}>
          {/* Inputs */}
          {inputs.map((input, index) => {
            const connectionColor = getNodeConnectionColors(input.key);
            return (
              <div key={index} style={{ display: "flex", alignItems: "center" }}>
                <Socket
                  type="input"
                  color={connectionColor}
                  socket={input.socket}
                  io={input}
                  innerRef={bindSocket}
                />
                {!input.showControl() && (
                  <div style={{ fontWeight: "bolder", fontSize: 17 }}>
                    {input.name}
                  </div>
                )}
              </div>
            )
          })}
          {/* Outputs */}
          {outputs.map(output => {
            const connectionColor = getNodeConnectionColors(output.key);
            return (
              <div key={output.key} style={{ display: "flex", alignItems: "center", paddingTop: 5, paddingBottom: 5 }}>
                <div style={{ fontWeight: "bolder", fontSize: 17 }}>
                  {output.name}
                </div>
                <Socket
                  type="output"
                  color={connectionColor}
                  socket={output.socket}
                  io={output}
                  innerRef={bindSocket}
                />
              </div>
            )
          })}
        </div>

        {/* Controls */}
        {controls.map(control => (
          <Control
            className="control"
            key={control.key}
            control={control}
            innerRef={bindControl}
          />
        ))}
      </div>
    );
  }
}