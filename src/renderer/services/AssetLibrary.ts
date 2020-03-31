import { AssetFile } from "./../../interfaces/AssetFile";
import { IS_WEB } from "./Webguard";
import fs from "fs";
export class LocalAssetLibrary {
  private assets: AssetFile[] = [];
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  importAssetData = () => {
    if (!IS_WEB) {
      if (fs.existsSync(this.filePath)) {
        try {
          const strdata = fs.readFileSync(this.filePath);
          const data = JSON.parse(strdata.toString());
          if (data) {
            this.assets = data;
          } else {
            console.log("No data found when reading file");
          }
        } catch (error) {
          //TODO:: Handle error
          console.log(error);
        }
      }
    } else {
      //TODO:: Add cloud arithmetic
    }
  };

  saveAssetData = () => {
    if (!IS_WEB) {
      const data = JSON.stringify(this.assets);
      fs.writeFileSync(this.filePath, data);
    } else {
    }
  };

  getAssetData = async () => {
    this.importAssetData();
    return this.assets;
  };

  setAssetData = (asset: AssetFile) => {
    this.importAssetData();
    let canSave = true;
    for (let i of this.assets) {
      if (asset.id === i.id) {
        canSave = false;
      }
    }
    if (canSave) {
      console.log(asset);
      this.assets.push(asset);
      this.saveAssetData();
    }
  };

  deleteAssetData = (id: string) => {
    this.importAssetData();
    let newAssets: AssetFile[] = [];
    for (let i of this.assets) {
      if (i.id !== id) {
        newAssets.push(i);
      }
    }
    this.assets = newAssets;
    this.saveAssetData();
  };
}
