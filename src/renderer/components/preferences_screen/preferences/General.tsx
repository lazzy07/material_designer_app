import React, { Component } from "react";
import Select from "../../form/Select";
import fs from "fs";
import Path from "path";
import {
  LOCAL_NODE_THEME_PATH,
  LOCAL_UI_THEME_PATH,
} from "../../../constants/Path";
import { defaultColors, ThemeManager } from "../../../constants/Colors";

interface State {
  uiTheme: { label: string; value: any };
  nodeTheme: { label: string; value: any };

  uiThemes: { label: string; value: any }[];
  nodeThemes: { label: string; value: any }[];
}

export default class General extends Component<any, State> {
  nodeThemePath = LOCAL_NODE_THEME_PATH;
  uiThemePath = LOCAL_UI_THEME_PATH;

  constructor(props: any) {
    super(props);

    this.state = {
      uiTheme: { label: "Default Theme", value: "0" },
      nodeTheme: { label: "Default Theme", value: "0" },
      uiThemes: [],
      nodeThemes: [],
    };
  }

  getAllThemes = (themePath: string, themeType: "uiThemes" | "nodeThemes") => {
    const dirents = fs.readdirSync(themePath, { withFileTypes: true });
    const files = dirents
      .filter((dirent) => dirent.isFile())
      .map((dirent) => dirent.name);

    let fileData: any[] = [];

    for (const i of files) {
      if (
        Path.parse(i).ext === ".matdutheme" ||
        Path.parse(i).ext === ".matdntheme"
      ) {
        const data = fs.readFileSync(Path.join(themePath, i));

        const jsonData = JSON.parse(data.toString());
        const modeledData = { label: jsonData.fileName, value: jsonData };

        fileData.push(modeledData);
      }
    }
    this.setState({ [themeType]: fileData } as any);
    return fileData;
  };

  onChangeTheme = (val: { label: string; value: any }, type: string) => {
    this.setState({ [type]: val } as any);
    ThemeManager.loadTheme(val.value);
    ThemeManager.saveTheme();
  };

  componentDidMount() {
    this.getAllThemes(this.uiThemePath, "uiThemes");
    this.getAllThemes(this.nodeThemePath, "nodeThemes");

    if (defaultColors.id !== "0") {
      this.setState({
        uiTheme: { label: defaultColors.fileName, value: defaultColors },
      });
    }

    if (defaultColors.nodeId !== "0") {
      this.setState({
        uiTheme: { label: defaultColors.nodeFIleName, value: defaultColors },
      });
    }
  }

  render() {
    return (
      <div style={{ height: "90vh" }}>
        <div className="container-fluid">
          <div>Set active UI theme</div>
          <Select
            onChange={(val) => this.onChangeTheme(val, "uiTheme")}
            value={this.state.uiTheme}
            options={this.state.uiThemes}
          />
          <div style={{ paddingTop: 20 }}>Set active Node theme</div>
          <Select
            onChange={(val) => this.onChangeTheme(val, "nodeTheme")}
            value={this.state.nodeTheme}
            options={this.state.nodeThemes}
          />
        </div>
      </div>
    );
  }
}
