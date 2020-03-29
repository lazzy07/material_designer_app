import React, { Component } from "react";
import { connect } from "react-redux";
import { Store } from "../../redux/reducers";
import { SystemReducer } from "../../redux/reducers/SystemReducer";
import { ImportTypes } from "../services/ImportImageData";
import { ImportAssetFile } from "../../interfaces/ImportAssetFile";
import { defaultColors } from "../constants/Colors";
import RadioButton from "../components/form/RadioButton";

interface Props {
  assetData: { type: ImportTypes; assets: ImportAssetFile[] };
}

interface State {}

class ImportScreen extends Component<Props, State> {
  //rendering file icon of the import asset
  renderFileIcon = (path: string) => {
    if (this.props.assetData.type === "node") {
      return null;
    } else {
      return <img src={path} alt="" />;
    }
  };

  renderAssetElement = (asset: ImportAssetFile, index: number) => {
    return (
      <div key={index} style={{ display: "flex", height: 40, width: "100%" }}>
        <div>{this.renderFileIcon(asset.filePath)}</div>
      </div>
    );
  };

  renderFileList = () => {
    const { assets } = this.props.assetData;

    return assets.map((ele, index) => {
      return this.renderAssetElement(ele, index);
    });
  };

  render() {
    const { type } = this.props.assetData;
    return (
      <div>
        <div style={{ paddingLeft: 20, paddingRight: 20 }}>
          <div style={{ paddingBottom: 5 }}>Files list to import</div>
          <div
            style={{
              height: 350,
              backgroundColor: defaultColors.IMPORTANT_BACKGROUND_COLOR,
              overflowY: "auto"
            }}
          >
            {this.renderFileList()}
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
