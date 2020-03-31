import { AssetFile } from "./../../interfaces/AssetFile";
import { IS_WEB } from "./Webguard";

export class LocalAssetLibrary {
  private assets: AssetFile[] = [];
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  importAssetData = () => {
    if (!IS_WEB) {
      const fs = require("fs");
      if (fs.existsSync(this.filePath)) {
        fs.readFile(this.filePath, (err, strData) => {
          if (err) {
            //TODO:: Handle error
            console.log(err);
          } else {
            try {
              const data = JSON.parse(strData);
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
        });
      }
    } else {
      //TODO:: Add cloud arithmetic
    }
  };

  saveAssetData = () => {
    if (!IS_WEB) {
      const fs = require("fs");

      const data = JSON.stringify(this.assets);
      fs.writeFile(this.filePath, data, err => {
        //TODO:: Handle error

        console.log(err);
      });
    } else {
    }
  };

  getAssetData = () => {
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
