import React, { Component } from "react";
import { connect } from "react-redux";
import { Store } from "../../redux/reducers";
import { ImportTypes } from "../services/ImportImageData";
import { ImportAssetFile } from "../../interfaces/ImportAssetFile";
import { defaultColors } from "../constants/Colors";
import InputBox from "../components/form/InputBox";
import Checkbox from "../components/form/Checkbox";
import Loading from "../components/common/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faSave } from "@fortawesome/free-solid-svg-icons";
import Button from "../components/form/Button";
import Dropdown from "react-dropdown";
import "../scss/dropdown.scss";
import fs from "fs";
import path from "path";
import { APP_DATA_PATH, LOCAL_LIBRARY_PATH } from "../constants/Path";
import { remote } from "electron";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { EXRLoader } from "three/examples/jsm/loaders/EXRLoader";
import * as THREE from "three";

interface Props {
  assetData: { type: ImportTypes; assets: ImportAssetFile[] };
  isLocal: boolean;
  isCloud: boolean;
  isProject: boolean;
  projectPath: string;
}

interface State {
  assetData: { type: ImportTypes; assets: ImportAssetFile[] };
  type: "inactive" | "saving" | "error" | "done";
  saveType: "Save to library" | "Save to project";
  saveLocal: boolean;
  saveCloud: boolean;
}

class ImportScreen extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      assetData: { ...this.props.assetData },
      type: "inactive",
      saveType: "Save to library",
      saveCloud: false,
      saveLocal: true,
    };
  }

  closeScreen = () => {
    remote.getCurrentWindow().close();
  };

  setFileName = (id: string, val: string) => {
    let data = [...this.state.assetData.assets];

    for (let i of data) {
      if (id === i.id) {
        i.fileName = val;
      }
    }

    this.setState({
      assetData: { ...this.state.assetData, assets: [...data] },
    });
  };

  setChecked = (id: string) => {
    let data = [...this.state.assetData.assets];

    for (let i of data) {
      if (id === i.id) {
        i.selected = !i.selected;
      }
    }

    this.setState({
      assetData: { ...this.state.assetData, assets: [...data] },
    });
  };

  //rendering file icon of the import asset
  renderFileIcon = (filePath: string) => {
    const type = this.state.assetData.type;
    if (type === "node") {
      return null;
    } else if (type === "texture") {
      return (
        <img
          style={{ maxWidth: 90, maxHeight: 90, objectFit: "contain" }}
          src={filePath}
          alt=""
        />
      );
    } else {
      const ext = path.parse(filePath).ext;
      if (ext === ".png") {
        return (
          <img
            style={{ maxWidth: 90, maxHeight: 90, objectFit: "contain" }}
            src={filePath}
            alt=""
          />
        );
      } else if (ext === ".hdr") {
        let myRef: HTMLDivElement | null;
        let dom = (
          <div
            id={filePath}
            ref={(ref) => (myRef = ref)}
            style={{ width: 90, height: 90 }}
          ></div>
        );
        new RGBELoader()
          .setDataType(THREE.UnsignedByteType)
          .load(filePath, (texture) => {
            const renderer = new THREE.WebGLRenderer();
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(90, 90);
            renderer.toneMapping = THREE.ReinhardToneMapping;
            renderer.toneMappingExposure = 2.0;

            renderer.outputEncoding = THREE.sRGBEncoding;
            renderer.setClearColor(defaultColors.DEFAULT_BACKGROUND_COLOR);
            const scene = new THREE.Scene();
            const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
            if (myRef) {
              if (myRef.children.length === 0)
                myRef.appendChild(renderer.domElement);
              let material = new THREE.MeshBasicMaterial({ map: texture });
              let quad = new THREE.PlaneBufferGeometry(
                (1.5 * texture.image.width) / texture.image.height,
                1.5
              );
              let mesh = new THREE.Mesh(quad, material);
              scene.add(mesh);
              renderer.toneMappingExposure = 2.0;
              renderer.render(scene, camera);
            }
          });
        return dom;
      } else if (ext === ".exr") {
        let myRef: HTMLDivElement | null;
        let dom = (
          <div
            id={filePath}
            ref={(ref) => (myRef = ref)}
            style={{ width: 90, height: 90 }}
          ></div>
        );
        new EXRLoader()
          .setDataType(THREE.FloatType)
          .load(filePath, (texture) => {
            const renderer = new THREE.WebGLRenderer();
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(90, 90);
            renderer.toneMapping = THREE.ReinhardToneMapping;
            renderer.toneMappingExposure = 2.0;

            renderer.outputEncoding = THREE.sRGBEncoding;
            renderer.setClearColor(defaultColors.DEFAULT_BACKGROUND_COLOR);
            const scene = new THREE.Scene();
            const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
            if (myRef) {
              if (myRef.children.length === 0)
                myRef.appendChild(renderer.domElement);
              let material = new THREE.MeshBasicMaterial({ map: texture });
              let quad = new THREE.PlaneBufferGeometry(
                (1.5 * texture.image.width) / texture.image.height,
                1.5
              );
              let mesh = new THREE.Mesh(quad, material);
              scene.add(mesh);
              renderer.toneMappingExposure = 2.0;
              renderer.render(scene, camera);
            }
          });
      }

      return <div></div>;
    }
  };

  //Creating preview file
  createPreviewFile = async (filePath: string, fileData: ImportAssetFile) => {
    return new Promise((resolve, reject) => {
      const fileType = this.props.assetData.type;

      const targetPath = path.join(
        filePath,
        "library",
        fileType,
        fileData.id + ".preview"
      );
    });
  };

  saveFileStates = (assets: ImportAssetFile[]) => {
    this.setState({ assetData: { ...this.state.assetData, assets } });
  };

  saveLocalFile = (filePath: string) => {
    let as = this.state.assetData.assets;

    for (let i of as) {
      if (i.selected) {
        i.activeType = "saving";
        this.saveFileStates(as);
        const p = path.parse(i.filePath);

        const libPath = path.join(
          filePath,
          "library",
          this.props.assetData.type
        );

        fs.mkdirSync(libPath, { recursive: true });

        const targetPath = path.join(
          filePath,
          "library",
          this.props.assetData.type,
          i.id + p.ext
        );

        fs.copyFile(i.filePath, targetPath, async (err) => {
          if (err) {
            //TODO:: Handle error
            console.log(err);
            i.activeType = "error";
            this.saveFileStates(as);
          } else {
            i.activeType = "done";

            //create preview file
            await this.createPreviewFile(filePath, i);

            this.saveFileStates(as);
          }
        });
      }
    }
  };

  saveToLocalLibrary = async () => {
    const targetPath = APP_DATA_PATH;

    this.saveLocalFile(targetPath);
  };

  saveToLocalProject = () => {
    const targetPath = this.props.projectPath;
    this.saveLocalFile(targetPath);
  };

  saveToCloudLibrary = () => {};

  saveToCloudProject = () => {};

  saveAssets = () => {
    if (this.state.saveType === "Save to library") {
      if (this.state.saveLocal) {
        this.saveToLocalLibrary();
      } else {
        if (this.state.saveCloud) {
          this.saveToCloudLibrary();
        }
      }
    } else {
      if (this.state.saveLocal) {
        this.saveToLocalProject();
      } else {
        if (this.state.saveCloud) {
          this.saveToCloudProject();
        }
      }
    }
  };

  renderFileStatusIcon = (asset: ImportAssetFile) => {
    switch (asset.activeType) {
      case "inactive":
        return (
          <Checkbox
            checked={asset.selected}
            onClick={() => this.setChecked(asset.id)}
          />
        );
      case "saving":
        return <Loading width={30} height={30} />;

      case "done":
        return (
          <FontAwesomeIcon
            icon={faCheck}
            style={{ color: defaultColors.PRIMARY_COLOR, fontSize: 25 }}
          />
        );

      case "error":
        return (
          <FontAwesomeIcon
            icon={faTimes}
            style={{ color: defaultColors.ERROR_COLOR, fontSize: 25 }}
          />
        );
    }
  };

  renderAssetElement = (asset: ImportAssetFile, index: number) => {
    return (
      <div
        key={index}
        style={{
          display: "flex",
          height: 90,
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            height: 90,
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {this.renderFileStatusIcon(asset)}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingLeft: 10,
            paddingRight: 10,
          }}
        >
          {this.renderFileIcon(asset.filePath)}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingLeft: 30,
            width: "100%",
          }}
        >
          <div style={{ fontSize: 13, width: "100%", textAlign: "left" }}>
            Enter file name
          </div>
          <InputBox
            placeHolder="Asset Name"
            value={asset.fileName}
            onChange={(key, val) => this.setFileName(asset.id, val)}
            id={asset.id}
          />
        </div>
      </div>
    );
  };

  renderFileList = () => {
    const { assets } = this.state.assetData;

    return assets.map((ele, index) => {
      return this.renderAssetElement(ele, index);
    });
  };

  render() {
    return (
      <div
        style={{
          height: "100%",
        }}
      >
        <div>
          <div
            style={{
              paddingTop: "20px",
              paddingLeft: "120px",
              paddingRight: "30px",
              paddingBottom: "0px",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <div style={{ paddingRight: "10PX" }}>
              Where you need these files to save
            </div>
            <Dropdown
              onChange={(val) => this.setState({ saveType: val.label as any })}
              value={this.state.saveType}
              options={
                this.props.isProject
                  ? ["Save to library", "Save to project"]
                  : ["Save to library"]
              }
            />
          </div>
        </div>
        <div style={{ paddingLeft: 20, paddingRight: 20 }}>
          <div style={{ paddingBottom: 5, paddingTop: 10 }}>
            Files list to import
          </div>
          <div
            style={{
              height: 350,
              backgroundColor: defaultColors.DEFAULT_BACKGROUND_COLOR,
              border: "2px solid " + defaultColors.BORDER_COLOR,
              overflowY: "auto",
              padding: "20px",
              paddingTop: "5px",
              paddingBottom: "5px",
            }}
          >
            {this.renderFileList()}
          </div>
          <div style={{ paddingTop: "15px" }}>
            <div
              style={{
                paddingLeft: "120px",
                paddingRight: "120px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Checkbox
                disabled={this.state.saveType === "Save to project"}
                onClick={() =>
                  this.setState({ saveCloud: !this.state.saveCloud })
                }
                checked={this.state.saveCloud}
                label="Add to cloud library"
              />
              <Checkbox
                disabled={this.state.saveType === "Save to project"}
                onClick={() =>
                  this.setState({ saveLocal: !this.state.saveLocal })
                }
                checked={this.state.saveLocal}
                label="Add to local library"
              />
            </div>
            <div style={{ height: 40 }}></div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                paddingLeft: "90px",
                paddingRight: "90px",
              }}
            >
              <Button
                icon={faSave}
                title={"Add to Library"}
                onClick={() => this.saveAssets()}
              />
              <div style={{ paddingRight: "20px" }}></div>
              <Button
                icon={faTimes}
                title={"Cancel"}
                onClick={() => this.closeScreen()}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: Store) => {
  return {
    assetData: state.system.importingAssets,
    isLocal: state.project.isLocal,
    isCloud: state.project.isCloud,
    isProject: state.project.id || state.project.filePath ? true : false,
    projectPath: state.project.filePath,
  };
};

export default connect(mapStateToProps)(ImportScreen);
