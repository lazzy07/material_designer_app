import React, { Component } from "react";
import { setImportFiles } from "../../redux/actions/SystemActions";
import { connect } from "react-redux";
import InputBox from "../components/form/InputBox";
import { ImportTypes } from "../services/ImportImageData";
import DropFiles from "../components/editor_page/editor_components/editor_dependencies/common/DropFiles";
import { IS_WEB } from "../services/Webguard";
import { IpcMessages } from "../../IpcMessages";
import { Store } from "../../redux/reducers";
import LibrarySettings, { THUMBNAIL_TYPES } from "../components/library_components/LibrarySettings";
import { AssetPreviewFile } from "../../interfaces/AssetPreviewFile";
import { PROJECT_HRIS_PATH, LOCAL_HDRIS_PATH } from "../constants/Path";
import { readJsonFile, getPreviewFiles } from "../services/FileServices";
import ImagePreview from "../components/library_components/ImagePreview";
import DraggableComponent from "../components/library_components/DraggableComponent";

interface Props {
  setImportFiles: (type: ImportTypes, files: File[]) => void;
  dimensions: { width: number; height: number };
  projectPath: string;
}

interface State {
  searchText: string;
  selectedThumbnail: THUMBNAIL_TYPES;
  libraryPreviewFiles: AssetPreviewFile[];
  projectPreviewFiles: AssetPreviewFile[];
}

class HDRIsComponent extends Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      searchText: "",
      selectedThumbnail: "thumblarge",
      libraryPreviewFiles: [],
      projectPreviewFiles: []
    };

    this.getLibraryHdriIcons();
  }

  onChangeSearchText = (text: string) => {
    this.setState({ searchText: text });
  };

  onDrop = (files: File[]) => {
    if (files.length > 0) {
      this.props.setImportFiles("hdri", files);

      if (!IS_WEB) {
        const ipcRenderer = require("electron").ipcRenderer;
        ipcRenderer.send(IpcMessages.OPEN_IMPORT_SCREEN);
      } else {
        //TODO:: Add web arithmetic here
      }
    }
  };

  getProjectHdriIcons = async () => {
    if (!IS_WEB) {
      const path = require("path");
      if (this.props.projectPath) {
        try {
          const projectHdriPath = PROJECT_HRIS_PATH();
          const files = await getPreviewFiles(projectHdriPath);
          let fileData: AssetPreviewFile[] = [];
          for (let i of files) {
            const data = await readJsonFile<AssetPreviewFile>(
              path.join(PROJECT_HRIS_PATH(), i)
            );
            fileData.push(data);
          }
          console.log(fileData);
          this.setState({ libraryPreviewFiles: fileData });
        } catch (err) {
          //TODO:: Handle error
          console.log(err);
        }
      }
    }
  };

  /**
   * Get and add all the icons of the library hdri (app library) to state
   */
  getLibraryHdriIcons = async () => {
    if (!IS_WEB) {
      const path = require("path");
      try {
        const files = await getPreviewFiles(LOCAL_HDRIS_PATH);
        let fileData: AssetPreviewFile[] = [];
        for (let i of files) {
          const data = await readJsonFile<AssetPreviewFile>(
            path.join(LOCAL_HDRIS_PATH, i)
          );
          fileData.push(data);
        }
        this.setState({ libraryPreviewFiles: fileData });
      } catch (err) {
        //TODO:: Handle error
        console.log(err);
      }
    }
  };


  renderLibraryPreviews = () => {
    return this.state.libraryPreviewFiles.map((ele) => {
      return this.renderImagePreviews(ele)
    });
  }

  renderProjectPreviews = () => {
    return this.state.projectPreviewFiles.map((ele) => {
      return this.renderImagePreviews(ele);
    });
  };

  renderImagePreviews = (ele: AssetPreviewFile) => {
    return <DraggableComponent key={ele.id} name={ele.id} data={{ itemType: "hdri", item: ele }}>
      <ImagePreview
        hdriType
        noBlackBackground
        thumbnailType={this.state.selectedThumbnail}
        id={ele.id}
        src={ele.data}
        title={ele.fileName}
      />
    </DraggableComponent>
  }

  setSelectedThumbnailType = (type: THUMBNAIL_TYPES) => {
    this.setState({
      selectedThumbnail: type,
    });
  };

  componentDidUpdate(prevProps: Props, _: State) {
    if (this.props.projectPath != prevProps.projectPath) {
      this.getProjectHdriIcons();
    }
  }


  render() {
    return (
      <div
        style={{
          height: this.props.dimensions.height,
          width: this.props.dimensions.width,
        }}
      >
        <LibrarySettings
          selected={this.state.selectedThumbnail}
          onClickThumbType={this.setSelectedThumbnailType}
          onClickRefresh={() => console.log("refresh")}
        />
        <div style={{ paddingLeft: "25px", paddingTop: "10px" }}>
          <InputBox
            id={"searchHdris"}
            value={this.state.searchText}
            placeHolder={"Search HDRI"}
            onChange={(_, val) => this.onChangeSearchText(val)}
          />
        </div>
        <DropFiles
          accept={[
            "image/jpeg",
            "image/png",
            "image/jpg",
            "image/hdr",
            ".hdr",
            ".exr",
          ]}
          onAccept={(files) => this.onDrop(files)}
          dimensions={this.props.dimensions}
        >
          <div style={{
            height: "100%", width: "100%", paddingBottom: "60px",
            overflowX: "hidden",
            overflowY: "scroll",
          }}>
            <div style={{
              display:
                this.state.selectedThumbnail !== "list" ? "flex" : undefined,
              flexWrap: "wrap",
              paddingLeft: 20,
              paddingRight: 20,
            }}>
              {this.renderLibraryPreviews()}
              {this.renderProjectPreviews()}
            </div>
          </div>
        </DropFiles>
      </div>
    );
  }
}

const mapDispatchToProps = {
  setImportFiles,
};

const mapStateToProps = (state: Store) => {
  return {
    projectPath: state.project.filePath,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HDRIsComponent);
