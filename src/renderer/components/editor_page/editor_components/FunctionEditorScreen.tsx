import React from "react";
import FunctionEditorComponent from "../../../editor_screens/FunctionEditorComponent";
import ScreenComponent from "../../common/ScreenComponent";

interface Props {}

interface State {}
export default class FunctionEditorScreen extends ScreenComponent<
  Props,
  State
> {
  render() {
    return (
      <div>
        <FunctionEditorComponent height={this.state.height} />
      </div>
    );
  }
}
