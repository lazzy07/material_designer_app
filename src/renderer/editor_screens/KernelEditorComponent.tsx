import React, { Component } from "react";
import MonacoEditor from "react-monaco-editor";

interface State {
  src: string;
}

interface Props {
  height: number;
}

export default class KernelEditorComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      src: "//Enter your kernel code here",
    };
  }

  onChangeCode = (val: string) => {
    this.setState({
      src: val,
    });
  };

  render() {
    return (
      <div>
        <MonacoEditor
          height={this.props.height}
          width="100%"
          language="cpp"
          theme="vs-dark"
          value={this.state.src}
          onChange={this.onChangeCode}
        />
      </div>
    );
  }
}
