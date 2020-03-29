import React, { Component } from "react";
import { setImportFiles } from "../../redux/actions/SystemActions";
import { connect } from "react-redux";
import InputBox from "../components/form/InputBox";
import { ImportTypes } from "../services/ImportImageData";
import DropFiles from "../components/editor_page/editor_components/editor_dependencies/common/DropFiles";
import { IS_WEB } from "../services/Webguard";
import { IpcMessages } from "../../IpcMessages";

interface Props {
  setImportFiles: (type: ImportTypes, files: File[]) => void;
  dimensions: { width: number; height: number };
}

interface State {}

class TexturesComponent extends Component<Props, State> {
  onDrop = (files: File[]) => {
    if (files.length > 0) {
      this.props.setImportFiles("texture", files);

      if (!IS_WEB) {
        const ipcRenderer = require("electron").ipcRenderer;

        ipcRenderer.send(IpcMessages.OPEN_IMPORT_SCREEN);
      } else {
        //TODO:: Add web arithmetic here
      }
    }
  };

  render() {
    return (
      <div
        style={{
          height: this.props.dimensions.height,
          width: this.props.dimensions.width
        }}
      >
        <div style={{ paddingLeft: "25px", paddingTop: "10px" }}>
          <InputBox
            id={"searchTextures"}
            value={""}
            placeHolder={"Search Texture"}
            onChange={() => {}}
          />
        </div>
        <DropFiles
          accept={["image/jpeg", "image/png", "image/jpg"]}
          onAccept={files => this.onDrop(files)}
          dimensions={this.props.dimensions}
        >
          <div style={{ height: "100%", width: "100%" }}></div>
        </DropFiles>
      </div>
    );
  }
}

const mapDispatchToProps = {
  setImportFiles
};

export default connect(null, mapDispatchToProps)(TexturesComponent);