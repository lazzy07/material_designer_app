import React, { Component } from "react";
import { connect } from "react-redux";
import { Store } from "../../redux/reducers";
import { defaultColors } from "../constants/Colors";

interface Props {
  height: number;
  width: number;
  kernelCompilerError: string;
}

interface State {}

class CompilerOutputComponent extends Component<Props, State> {
  render() {
    return (
      <div style={{ padding: 20 }}>
        <p>
          <b style={{ color: defaultColors.ERROR_COLOR }}>
            {this.props.kernelCompilerError}
          </b>
        </p>
      </div>
    );
  }
}

const mapStateToProps = (store: Store) => {
  return {
    kernelCompilerError: store.system.kernelCompilerError,
  };
};

export default connect(mapStateToProps)(CompilerOutputComponent);
