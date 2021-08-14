import React, { Component } from "react";
import MonacoEditor from "react-monaco-editor";

interface State {
  src: string;
}

interface Props {
  height: number;
}

export default class FunctionEditorComponent extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      src: "//Add your custom functions here\n",
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
