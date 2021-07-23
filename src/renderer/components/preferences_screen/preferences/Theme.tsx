import {
  faDownload,
  faPlus,
  faSave,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import React, { Component } from "react";
import { LOCAL_UI_THEME_PATH } from "../../../constants/Path";
import { IS_WEB } from "../../../services/Webguard";
import Button from "../../form/Button";
import ColorSelect from "../../form/ColorSelect";
import InputBox from "../../form/InputBox";
import Select from "../../form/Select";
import { v4 } from "uuid";
import Path from "path";
import fs from "fs";

interface State {
  data: {
    id: string;
    fileName: string;
    DEFAULT_BACKGROUND_COLOR: string;
    IMPORTANT_BACKGROUND_COLOR: string;
    FONT_COLOR: string;
    IMPORTANT_FONT_COLOR: string;
    DISABLED_FONT_COLOR: string;
    ERROR_COLOR: string;
    PRIMARY_COLOR: string;
    HOVER_COLOR: string;
    BORDER_COLOR: string;
  };
  themes: { fileName: string; id: string; [key: string]: string }[];
  selected: string;
}

const defaultTheme = {
  DEFAULT_BACKGROUND_COLOR: "#293538",
  IMPORTANT_BACKGROUND_COLOR: "#20292b",
  FONT_COLOR: "#b3b6b6",
  IMPORTANT_FONT_COLOR: "#cfd5d6",
  DISABLED_FONT_COLOR: "#5a6f72",
  ERROR_COLOR: "#e8232d",
  PRIMARY_COLOR: "#009688",
  HOVER_COLOR: "#5a6f72",
  BORDER_COLOR: "#364346",
};

export default class Theme extends Component<any, State> {
  themePath = LOCAL_UI_THEME_PATH;

  constructor(props: any) {
    super(props);

    this.state = {
      data: { id: "", fileName: "", ...defaultTheme },
      themes: [],
      selected: "",
    };
  }

  createNew = () => {
    const id = v4();
    const data = {
      ...this.state.data,
      id,
      fileName: "New Theme",
    };
    this.setState({
      data: data,
      selected: id,
      themes: [...this.state.themes, data],
    });
  };

  saveTheme = () => {
    if (IS_WEB) {
      //TODO::Add web functionality
    } else {
      if (!fs.existsSync(this.themePath)) {
        fs.mkdirSync(this.themePath, { recursive: true });
      }

      const file = Path.join(
        this.themePath,
        this.state.data.id + ".matdutheme"
      );
      fs.writeFileSync(file, JSON.stringify(this.state.data));
      this.getAllThemes();
    }
  };

  getThemeData = (file: string) => {
    const path = Path.join(this.themePath, file);

    const data = fs.readFileSync(path);
    const jsonData = JSON.parse(data.toString());
    this.setState({ ...jsonData });
  };

  getAllThemes = () => {
    const dirents = fs.readdirSync(this.themePath, { withFileTypes: true });
    const files = dirents
      .filter((dirent) => dirent.isFile())
      .map((dirent) => dirent.name);

    let fileData: any[] = [];

    for (const i of files) {
      if (Path.parse(i).ext === ".matdutheme") {
        const data = fs.readFileSync(Path.join(this.themePath, i));

        const jsonData = JSON.parse(data.toString());
        fileData.push(jsonData);
      }
    }

    this.setState({ themes: fileData });

    return fileData;
  };

  setColorData = (key: string, val: string) => {
    this.setState({ data: { ...this.state.data, [key]: val } });
  };

  getSelected = () => {
    const ele = this.state.themes.find((e) => e.id === this.state.selected);
    if (ele) {
      return { label: ele.fileName, value: ele.id };
    } else {
      return { label: "No file found", value: "0" };
    }
  };

  onSelect = (e: { label: string; value: string }) => {
    this.setState({ selected: e.value });

    const theme = this.state.themes.find((ele) => {
      return ele.id === e.value;
    });

    if (theme) {
      this.setState({ data: { ...this.state.data, ...theme } });
    }
  };

  componentDidMount() {
    if (!IS_WEB) {
      if (!fs.existsSync(this.themePath)) {
        fs.mkdirSync(this.themePath, { recursive: true });
      }
    }
    this.getAllThemes();
  }

  render() {
    return (
      <div style={{ height: "90vh" }}>
        <div className="container-fluid">
          <div>Select a theme or create a one</div>
          <Select
            onChange={this.onSelect}
            value={this.getSelected()}
            options={this.state.themes.map((ele) => ({
              label: ele.fileName,
              value: ele.id,
            }))}
          />
          <div style={{ paddingLeft: 18, paddingTop: 20 }}>
            <InputBox
              disabled={!this.state.selected}
              label="Theme Name"
              id="fileName"
              onChange={(key, val) => {
                this.setColorData(key, val);
              }}
              value={this.state.data.fileName}
              placeHolder="Enter a theme name"
            />
          </div>
          <div style={{ paddingTop: 5 }}>
            <div className="container-fluid">
              <div className="row">
                <div className="col-6">
                  <ColorSelect
                    id="DEFAULT_BACKGROUND_COLOR"
                    screen="preferences"
                    color={this.state.data.DEFAULT_BACKGROUND_COLOR}
                    onChange={(val) =>
                      this.setColorData("DEFAULT_BACKGROUND_COLOR", val)
                    }
                    title="Background Color"
                  />
                </div>
                <div className="col-6">
                  <ColorSelect
                    id="IMPORTANT_BACKGROUND_COLOR"
                    screen="preferences"
                    color={this.state.data.IMPORTANT_BACKGROUND_COLOR}
                    onChange={(val) =>
                      this.setColorData("IMPORTANT_BACKGROUND_COLOR", val)
                    }
                    title="Secondary Background Color"
                  />
                </div>
                <div className="col-6">
                  <ColorSelect
                    id="FONT_COLOR"
                    screen="preferences"
                    color={this.state.data.FONT_COLOR}
                    onChange={(val) => this.setColorData("FONT_COLOR", val)}
                    title="Font Color"
                  />
                </div>
                <div className="col-6">
                  <ColorSelect
                    id="IMPORTANT_FONT_COLOR"
                    screen="preferences"
                    color={this.state.data.IMPORTANT_FONT_COLOR}
                    onChange={(val) =>
                      this.setColorData("IMPORTANT_FONT_COLOR", val)
                    }
                    title="Secondary Font Color"
                  />
                </div>
                <div className="col-6">
                  <ColorSelect
                    id="DISABLED_FONT_COLOR"
                    screen="preferences"
                    color={this.state.data.DISABLED_FONT_COLOR}
                    onChange={(val) =>
                      this.setColorData("DISABLED_FONT_COLOR", val)
                    }
                    title="Disabled Font Color"
                  />
                </div>
                <div className="col-6">
                  <ColorSelect
                    id="ERROR_COLOR"
                    screen="preferences"
                    color={this.state.data.ERROR_COLOR}
                    onChange={(val) => this.setColorData("ERROR_COLOR", val)}
                    title="Error Color"
                  />
                </div>
                <div className="col-6">
                  <ColorSelect
                    id="PRIMARY_COLOR"
                    screen="preferences"
                    color={this.state.data.PRIMARY_COLOR}
                    onChange={(val) => this.setColorData("PRIMARY_COLOR", val)}
                    title="Primary Color"
                  />
                </div>
                <div className="col-6">
                  <ColorSelect
                    id="HOVER_COLOR"
                    screen="preferences"
                    color={this.state.data.HOVER_COLOR}
                    onChange={(val) => this.setColorData("HOVER_COLOR", val)}
                    title="Hover Color"
                  />
                </div>
                <div className="col-6">
                  <ColorSelect
                    id="BORDER_COLOR"
                    screen="preferences"
                    color={this.state.data.BORDER_COLOR}
                    onChange={(val) => this.setColorData("BORDER_COLOR", val)}
                    title="Border Color"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 20,
            left: "0%",
            display: "flex",
            width: "100%",
            justifyContent: "space-around",
          }}
        >
          <Button
            disabled={!this.state.selected}
            icon={faSave}
            title="Save"
            onClick={this.saveTheme}
          />
          <Button icon={faPlus} title="New" onClick={this.createNew} />
          <Button
            icon={faDownload}
            title="Load Default"
            onClick={() =>
              this.setState({ data: { ...this.state.data, ...defaultTheme } })
            }
          />
          <Button icon={faTrash} title="Delete" onClick={() => {}} />
        </div>
      </div>
    );
  }
}
