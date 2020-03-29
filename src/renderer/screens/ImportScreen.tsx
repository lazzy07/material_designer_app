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
import RadioButton from "../components/form/RadioButton";
import Dropdown from "react-dropdown";
import "../scss/dropdown.scss";
interface Props {
  assetData: { type: ImportTypes; assets: ImportAssetFile[] };
}

interface State {
  assetData: { type: ImportTypes; assets: ImportAssetFile[] };
  type: "inactive" | "saving" | "error" | "done";
}

class ImportScreen extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      assetData: { ...this.props.assetData },
      type: "inactive"
    };
  }

  setFileName = (id: string, val: string) => {
    let data = [...this.state.assetData.assets];

    for (let i of data) {
      if (id === i.id) {
        i.fileName = val;
      }
    }

    this.setState({
      assetData: { ...this.state.assetData, assets: [...data] }
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
      assetData: { ...this.state.assetData, assets: [...data] }
    });
  };

  //rendering file icon of the import asset
  renderFileIcon = (path: string) => {
    if (this.state.assetData.type === "node") {
      return null;
    } else {
      return (
        <img
          style={{ maxWidth: 90, maxHeight: 90, objectFit: "contain" }}
          src={path}
          alt=""
        />
      );
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
          width: "100%"
        }}
      >
        <div
          style={{
            display: "flex",
            height: 90,
            flexDirection: "column",
            justifyContent: "center"
          }}
        >
          {this.renderFileStatusIcon(asset)}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingLeft: 10,
            paddingRight: 10
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
            width: "100%"
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
          height: "100%"
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
              justifyContent: "flex-end"
            }}
          >
            <div style={{ paddingRight: "10PX" }}>
              Where you need these files to save
            </div>
            <Dropdown
              disabled
              className={"diabledDropdown"}
              value={"Save to library"}
              options={["Save to library", "Save to project"]}
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
              paddingBottom: "5px"
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
                justifyContent: "space-between"
              }}
            >
              <Checkbox onClick={() => {}} label="Add to cloud library" />
              <Checkbox onClick={() => {}} label="Add to local library" />
            </div>
            <div style={{ height: 40 }}></div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                paddingLeft: "90px",
                paddingRight: "90px"
              }}
            >
              <Button
                icon={faSave}
                title={"Add to Library"}
                onClick={() => {}}
              />
              <div style={{ paddingRight: "20px" }}></div>
              <Button icon={faTimes} title={"Cancel"} onClick={() => {}} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: Store) => {
  return {
    assetData: state.system.importingAssets
  };
};

export default connect(mapStateToProps)(ImportScreen);
