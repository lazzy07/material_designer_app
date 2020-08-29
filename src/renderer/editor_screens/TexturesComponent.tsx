import React, { Component } from "react";
import { setImportFiles } from "../../redux/actions/SystemActions";
import { connect } from "react-redux";
import InputBox from "../components/form/InputBox";
import { ImportTypes } from "../services/ImportImageData";
import DropFiles from "../components/editor_page/editor_components/editor_dependencies/common/DropFiles";
import { IS_WEB } from "../services/Webguard";
import { IpcMessages } from "../../IpcMessages";
import { getPreviewFiles, readJsonFile } from "../services/FileServices";
import { LOCAL_TEXTURES_PATH, PROJECT_TEXTURES_PATH } from "../constants/Path";
import { AssetPreviewFile } from "../../interfaces/AssetPreviewFile";
import { Store } from "../../redux/reducers";
import ImagePreview from "../components/library_components/ImagePreview";
import LibrarySettings, {
  THUMBNAIL_TYPES,
} from "../components/library_components/LibrarySettings";
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
  selected: string;
}

class TexturesComponent extends Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      selected: "",
      searchText: "",
      selectedThumbnail: "thumb",
      libraryPreviewFiles: [],
      projectPreviewFiles: [],
    };

    this.getLibraryTextureIcons();
  }

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

  onChangeSearchText = (text: string) => {
    this.setState({ searchText: text });
  };

  setSelected = (id: string) => {
    this.setState({ selected: id })
  }

  /**
   * Get all the icons of the project libraries textures to state
   */
  getProjectTextureIcons = async () => {
    if (!IS_WEB) {
      const path = require("path");
      if (this.props.projectPath) {
        try {
          const projectTexPath = PROJECT_TEXTURES_PATH();
          const files = await getPreviewFiles(projectTexPath);
          let fileData: AssetPreviewFile[] = [];
          for (let i of files) {
            const data = await readJsonFile<AssetPreviewFile>(
              path.join(PROJECT_TEXTURES_PATH(), i)
            );
            fileData.push(data);
          }
          this.setState({ libraryPreviewFiles: fileData });
        } catch (err) {
          //TODO:: Handle error
          console.log(err);
        }
      }
    }
  };

  /**
   * Get and add all the icons of the library textures (app library) to state
   */
  getLibraryTextureIcons = async () => {
    if (!IS_WEB) {
      const path = require("path");
      try {
        const files = await getPreviewFiles(LOCAL_TEXTURES_PATH);
        let fileData: AssetPreviewFile[] = [];
        for (let i of files) {
          const data = await readJsonFile<AssetPreviewFile>(
            path.join(LOCAL_TEXTURES_PATH, i)
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
  };

  renderProjectPreviews = () => {
    return this.state.projectPreviewFiles.map((ele) => {
      return this.renderImagePreviews(ele)
    });
  };

  renderImagePreviews = (ele: AssetPreviewFile) => {
    console.log(ele)
    return (
      <DraggableComponent key={ele.id} data={{ itemType: "texture", item: ele }} name={ele.id}>
        <ImagePreview
          id={ele.id}
          thumbnailType={this.state.selectedThumbnail}
          src={ele.data}
          title={ele.fileName}
        />
      </DraggableComponent>
    );
  }

  setSelectedThumbnailType = (type: THUMBNAIL_TYPES) => {
    this.setState({
      selectedThumbnail: type,
    });
  };

  componentDidUpdate(prevProps: Props) {
    if (this.props.projectPath != prevProps.projectPath) {
      this.getProjectTextureIcons();
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
            id={"searchTextures"}
            value={this.state.searchText}
            placeHolder={"Search Texture"}
            onChange={(_, val) => this.onChangeSearchText(val)}
          />
        </div>
        <DropFiles
          accept={["image/jpeg", "image/png", "image/jpg"]}
          onAccept={(files) => this.onDrop(files)}
          dimensions={this.props.dimensions}
        >
          <div
            style={{
              height: "100%",
              width: "100%",
              paddingBottom: "60px",
              overflowX: "hidden",
              overflowY: "scroll",
            }}
          >
            <div
              style={{
                display:
                  this.state.selectedThumbnail !== "list" ? "flex" : undefined,
                flexWrap: "wrap",
                paddingLeft: 20,
                paddingRight: 20,
              }}
            >
              {this.renderLibraryPreviews()}
              <div>{this.renderProjectPreviews()}</div>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TexturesComponent);
