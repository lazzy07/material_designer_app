import React, { Component } from "react";
import MonacoEditor from "react-monaco-editor";

interface State {
  src: string;
}

export default class FunctionEditorComponent extends Component<any, State> {
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
          height="200px"
          width="100%"
          language="cpp"
          theme="va-dark"
          value={this.state.src}
          onChange={this.onChangeCode}
        />
      </div>
    );
  }
}
