import {
  faDownload,
  faPlus,
  faSave,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import React, { Component } from "react";
import { LOCAL_NODE_THEME_PATH } from "../../../constants/Path";
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
    nodeId: string;
    nodeFileName: string;
    GENERATOR_COLOR: string;
    GENERATOR_GRAYSCALE: string;
    PROCESS_COLOR: string;
    PROCESS_GRAYSCALE: string;
    OUTPUT_COLOR: string;
    OUTPUT_GRAYSCALE: string;
    GRAPH_EDITOR_BACKGRUND_COLOR: string;
    GRAPH_EDITOR_GRID_COLOR: string;
    NODE_HEADER_FONT_COLOR: string;
    NODE_BODY_BACKGROUND_COLOR: string;
    NODE_BODY_FONT_COLOR: string;
    GRAYSCALE_CONNETION_COLOR: string;
    COLOR_CONNECTION_COLOR: string;
    FLOAT_CONECTION_COLOR: string;
    INT_CONNECTION_COLOR: string;
    COLORPICK_CONNECTION_COLOR: string;
    FLOATVEC2_CONNECTION_COLOR: string;
    INTVEC2_CONNECTION_COLOR: string;
  };
  themes: { fileName: string; id: string; [key: string]: string }[];
  selected: string;
}

const defaultTheme = {
  GENERATOR_COLOR: "#e91e63",
  GENERATOR_GRAYSCALE: "#8bc34a",
  PROCESS_COLOR: "#ff5722",
  PROCESS_GRAYSCALE: "#00bcd4",
  OUTPUT_COLOR: "#673ab7",
  OUTPUT_GRAYSCALE: "#f44336",
  GRAPH_EDITOR_BACKGRUND_COLOR: "#2d3a3d",
  GRAPH_EDITOR_GRID_COLOR: "#364346",
  NODE_HEADER_FONT_COLOR: "#ffffff",
  NODE_BODY_BACKGROUND_COLOR: "#20292b",
  NODE_BODY_FONT_COLOR: "#b3b6b6",
  GRAYSCALE_CONNETION_COLOR: "#b3b6b6",
  COLOR_CONNECTION_COLOR: "#ffa500",
  FLOAT_CONECTION_COLOR: "#8bc34a",
  INT_CONNECTION_COLOR: "#e91e63",
  COLORPICK_CONNECTION_COLOR: "#ff5722",
  FLOATVEC2_CONNECTION_COLOR: "#00bcd4",
  INTVEC2_CONNECTION_COLOR: "#673ab7",
};

export default class NodeTheme extends Component<any, State> {
  themePath = LOCAL_NODE_THEME_PATH;

  constructor(props: any) {
    super(props);

    this.state = {
      data: { nodeId: "", nodeFileName: "", ...defaultTheme },
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
        this.state.data.nodeId + ".matdntheme"
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
      return { label: "No file selected", value: "0" };
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
              value={this.state.data.nodeFileName}
              placeHolder="Enter a theme name"
            />
          </div>
          <div style={{ paddingTop: 5 }}>
            <div className="container-fluid">
              <div className="row">
                <div className="col-6">
                  <ColorSelect
                    id="GENERATOR_COLOR"
                    screen="preferences"
                    color={this.state.data.GENERATOR_COLOR}
                    onChange={(val) =>
                      this.setColorData("GENERATOR_COLOR", val)
                    }
                    title="Color Generator Node"
                  />
                </div>
                <div className="col-6">
                  <ColorSelect
                    id="GENERATOR_GRAYSCALE"
                    screen="preferences"
                    color={this.state.data.GENERATOR_GRAYSCALE}
                    onChange={(val) =>
                      this.setColorData("GENERATOR_GRAYSCALE", val)
                    }
                    title="Secondary Background Color"
                  />
                </div>
                <div className="col-6">
                  <ColorSelect
                    id="PROCESS_COLOR"
                    screen="preferences"
                    color={this.state.data.PROCESS_COLOR}
                    onChange={(val) => this.setColorData("PROCESS_COLOR", val)}
                    title="Color Process Node"
                  />
                </div>
                <div className="col-6">
                  <ColorSelect
                    id="PROCESS_GRAYSCALE"
                    screen="preferences"
                    color={this.state.data.PROCESS_GRAYSCALE}
                    onChange={(val) =>
                      this.setColorData("PROCESS_GRAYSCALE", val)
                    }
                    title="Greyscale Process Node"
                  />
                </div>
                <div className="col-6">
                  <ColorSelect
                    id="OUTPUT_COLOR"
                    screen="preferences"
                    color={this.state.data.OUTPUT_COLOR}
                    onChange={(val) => this.setColorData("OUTPUT_COLOR", val)}
                    title="Color Output Node"
                  />
                </div>
                <div className="col-6">
                  <ColorSelect
                    id="OUTPUT_GRAYSCALE"
                    screen="preferences"
                    color={this.state.data.OUTPUT_GRAYSCALE}
                    onChange={(val) =>
                      this.setColorData("OUTPUT_GRAYSCALE", val)
                    }
                    title="Greyscale Output Node"
                  />
                </div>
                <div className="col-6">
                  <ColorSelect
                    id="GRAPH_EDITOR_BACKGRUND_COLOR"
                    screen="preferences"
                    color={this.state.data.GRAPH_EDITOR_BACKGRUND_COLOR}
                    onChange={(val) =>
                      this.setColorData("GRAPH_EDITOR_BACKGRUND_COLOR", val)
                    }
                    title="Graph Background"
                  />
                </div>
                <div className="col-6">
                  <ColorSelect
                    id="GRAPH_EDITOR_GRID_COLOR"
                    screen="preferences"
                    color={this.state.data.GRAPH_EDITOR_GRID_COLOR}
                    onChange={(val) =>
                      this.setColorData("GRAPH_EDITOR_GRID_COLOR", val)
                    }
                    title="Grid Color"
                  />
                </div>
                <div className="col-6">
                  <ColorSelect
                    id="NODE_HEADER_FONT_COLOR"
                    screen="preferences"
                    color={this.state.data.NODE_HEADER_FONT_COLOR}
                    onChange={(val) =>
                      this.setColorData("NODE_HEADER_FONT_COLOR", val)
                    }
                    title="Header Font Color"
                  />
                </div>
                <div className="col-6">
                  <ColorSelect
                    id="NODE_BODY_BACKGROUND_COLOR"
                    screen="preferences"
                    color={this.state.data.NODE_BODY_BACKGROUND_COLOR}
                    onChange={(val) =>
                      this.setColorData("NODE_BODY_BACKGROUND_COLOR", val)
                    }
                    title="Node Body Background"
                  />
                </div>
                <div className="col-6">
                  <ColorSelect
                    id="NODE_BODY_FONT_COLOR"
                    screen="preferences"
                    color={this.state.data.NODE_BODY_FONT_COLOR}
                    onChange={(val) =>
                      this.setColorData("NODE_BODY_FONT_COLOR", val)
                    }
                    title="Node Body Font"
                  />
                </div>
                <div className="col-6">
                  <ColorSelect
                    id="GRAYSCALE_CONNETION_COLOR"
                    screen="preferences"
                    color={this.state.data.GRAYSCALE_CONNETION_COLOR}
                    onChange={(val) =>
                      this.setColorData("GRAYSCALE_CONNETION_COLOR", val)
                    }
                    title="Greyscale Connection"
                  />
                </div>
                <div className="col-6">
                  <ColorSelect
                    id="COLOR_CONNECTION_COLOR"
                    screen="preferences"
                    color={this.state.data.COLOR_CONNECTION_COLOR}
                    onChange={(val) =>
                      this.setColorData("COLOR_CONNECTION_COLOR", val)
                    }
                    title="Color Connection"
                  />
                </div>
                <div className="col-6">
                  <ColorSelect
                    id="FLOAT_CONECTION_COLOR"
                    screen="preferences"
                    color={this.state.data.FLOAT_CONECTION_COLOR}
                    onChange={(val) =>
                      this.setColorData("FLOAT_CONECTION_COLOR", val)
                    }
                    title="Float Connection"
                  />
                </div>
                <div className="col-6">
                  <ColorSelect
                    id="INT_CONNECTION_COLOR"
                    screen="preferences"
                    color={this.state.data.INT_CONNECTION_COLOR}
                    onChange={(val) =>
                      this.setColorData("INT_CONNECTION_COLOR", val)
                    }
                    title="Int Connection"
                  />
                </div>
                <div className="col-6">
                  <ColorSelect
                    id="COLORPICK_CONNECTION_COLOR"
                    screen="preferences"
                    color={this.state.data.COLORPICK_CONNECTION_COLOR}
                    onChange={(val) =>
                      this.setColorData("COLORPICK_CONNECTION_COLOR", val)
                    }
                    title="ColorPick Connection"
                  />
                </div>
                <div className="col-6">
                  <ColorSelect
                    id="FLOATVEC2_CONNECTION_COLOR"
                    screen="preferences"
                    color={this.state.data.FLOATVEC2_CONNECTION_COLOR}
                    onChange={(val) =>
                      this.setColorData("FLOATVEC2_CONNECTION_COLOR", val)
                    }
                    title="Float2 Connection"
                  />
                </div>
                <div className="col-6">
                  <ColorSelect
                    id="INTVEC2_CONNECTION_COLOR"
                    screen="preferences"
                    color={this.state.data.INTVEC2_CONNECTION_COLOR}
                    onChange={(val) =>
                      this.setColorData("INTVEC2_CONNECTION_COLOR", val)
                    }
                    title="Int2 Connection"
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
