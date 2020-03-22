import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudUploadAlt,
  faUserSlash,
  faBan,
  IconDefinition,
  faWifi,
  faExclamationCircle,
  faFile,
  faTimesCircle,
  faPlusSquare,
  faPlus
} from "@fortawesome/free-solid-svg-icons";
import Checkbox from "../components/form/Checkbox";
import Button from "../components/form/Button";
import { defaultColors } from "../constants/Colors";
import InputBox from "../components/form/InputBox";
import Textarea from "../components/form/Textarea";
import { remote, ipcRenderer } from "electron";
import { IpcMessages } from "../../IpcMessages";
import { connect } from "react-redux";
import { saveNewProjectData } from "../../redux/actions/SaveProjectActions";
import fs from "fs";
import path from "path";
import { SAVE_DEFAULT_PATH, LAST_SAVE_PATH } from "../constants/Path";
import unusedFilename from "unused-filename";
import validFileName from "valid-filename";

type CloudConnectionType =
  | "no_network"
  | "not_loggedin"
  | "loggedin"
  | "network_error";

interface State {
  cloudActive: boolean;
  localActive: boolean;
  data: {
    fileName: string;
    filePath: string;
    description: string;
  };
  errors: {
    fileName: string;
    filePath: string;
    description: string;
    main: string;
  };
}

interface Props {
  saveNewProjectData: (data: any) => void;
}

class NewProjectScreen extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      cloudActive: false,
      localActive: true,
      data: {
        fileName: "Untitled",
        filePath: localStorage.getItem(LAST_SAVE_PATH) || this.getSavePath(),
        description: ""
      },
      errors: {
        fileName: "",
        filePath: "",
        description: "",
        main: ""
      }
    };
  }

  //TODO::Add arithmetic to check loggedin or not
  getNetworkInfo = (): CloudConnectionType => {
    return "loggedin";
  };

  //TODO::Add webguard
  openSaveProjectScreen = () => {
    ipcRenderer.send(IpcMessages.SAVE_PROJECT_PAGE);
  };

  setChanges = (key: string, val: string) => {
    this.setState({
      data: { ...this.state.data, [key]: val },
      errors: { ...this.state.errors, [key]: "" }
    });

    key === "fileName" ||
      (key === "filePath" &&
        this.setState({ errors: { ...this.state.errors, main: "" } }));
  };

  setError = (key: string, val: string) => {
    this.setState({ errors: { ...this.state.errors, [key]: val } });
  };

  getCloudConnectionIcon = (): IconDefinition => {
    const netinfo = this.getNetworkInfo();
    switch (netinfo) {
      case "no_network":
        return faBan;
      case "not_loggedin":
        return faUserSlash;
      case "loggedin":
        return faCloudUploadAlt;
      case "network_error":
        return faExclamationCircle;
    }
  };

  toggleCloudActive = () => {
    this.setState({ cloudActive: !this.state.cloudActive });
  };

  toggleLocalActive = () => {
    this.setState({ localActive: !this.state.localActive });
  };

  getCloudText = () => {
    switch (this.getNetworkInfo()) {
      case "loggedin":
        return `Cloud save ${this.state.cloudActive ? "active" : "inactive"}`;
      case "network_error":
        return "Network Error!";
      case "no_network":
        return "No network";
      case "not_loggedin":
        return "Not logged in";
    }
  };

  //TODO:: Add webguard
  closeNewrojectScreen = () => {
    const window = remote.getCurrentWindow();
    window.close();
  };

  getSavePath = () => {
    const documentsPath = remote.app.getPath("documents");

    if (fs.existsSync(SAVE_DEFAULT_PATH)) {
      return SAVE_DEFAULT_PATH;
    } else {
      return documentsPath;
    }
  };

  getFileName = async () => {
    return await unusedFilename(
      path.join(this.state.data.filePath, this.state.data.fileName + ".matproj")
    );
  };

  //TODO:: Add webguard
  openSaveDialog = () => {
    const p = path.parse(
      path.join(this.state.data.filePath, this.state.data.fileName)
    );

    const fullPath = path.join(
      this.state.data.filePath.trim(),
      p.ext
        ? this.state.data.fileName.trim()
        : this.state.data.fileName.trim() + ".matproj"
    );

    remote.dialog
      .showSaveDialog(remote.getCurrentWindow(), {
        title: "Save New Project",
        defaultPath: fullPath,
        buttonLabel: "Add Project",
        filters: [{ name: "Material Projects", extensions: ["matproj"] }],
        properties: ["createDirectory", "showOverwriteConfirmation"]
      })
      .then(val => {
        if (!val.canceled) {
          const fullPath = val.filePath;

          if (fullPath) {
            const fp = path.parse(fullPath);

            localStorage.setItem(LAST_SAVE_PATH, fp.dir);

            this.setChanges("filePath", fp.dir);
            this.setChanges("fileName", fp.name);
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  //TODO:: Add webguard
  validFilePath = () => {
    return fs.existsSync(this.state.data.filePath.trim());
  };

  checkCanSave = () => {
    if (this.state.data.fileName.length > 0) {
      if (this.state.data.filePath.length > 0 && this.validFilePath()) {
        if (validFileName(this.state.data.fileName)) {
          if (this.state.data.description.length >= 10) {
            return true;
          } else {
            this.setError(
              "description",
              "Description must be atleat 10 characters long"
            );
          }
        } else {
          this.setError("filePath", "Not a valid filename");
        }
      } else {
        this.setError("filePath", "Not a valid path");
      }
    } else {
      this.setError("fileName", "File name cannot be empty");
    }
    return false;
  };

  onClickCreate = (nc = false) => {
    const p = path.parse(
      path.join(
        this.state.data.filePath.trim(),
        this.state.data.fileName.trim()
      )
    );

    const fullPath = path.join(
      this.state.data.filePath.trim(),
      p.ext
        ? this.state.data.fileName.trim()
        : this.state.data.fileName.trim() + ".matproj"
    );

    if (this.checkCanSave()) {
      if (!nc) {
        if (fs.existsSync(fullPath)) {
          return this.setError(
            "main",
            "File already exists, want to continue?"
          );
        }
      }

      this.props.saveNewProjectData({
        localActive: this.state.localActive,
        cloudActive: this.state.cloudActive,
        fileName: this.state.data.fileName,
        filePath: this.state.data.filePath,
        description: this.state.data.description
      });
      this.openSaveProjectScreen();
    }
  };

  componentDidMount = () => {
    //TODO:: Add webguard
    this.getFileName().then(val => {
      const p = path.parse(val);
      this.setState({ data: { ...this.state.data, fileName: p.name } });
    });
  };

  render() {
    return (
      <div>
        <div className="row">
          <div
            className="col-sm-4"
            style={{
              height: window.innerHeight - 30,
              overflow: "hidden",
              position: "relative",
              fontSize: 80
            }}
          >
            <div style={{ fontSize: 28, paddingTop: 30, paddingLeft: 20 }}>
              Create New Project
            </div>
            <div style={{ top: "20%", left: "15%", position: "absolute" }}>
              <FontAwesomeIcon
                icon={this.getCloudConnectionIcon()}
                style={{
                  color:
                    this.getNetworkInfo() === "no_network" ||
                    this.getNetworkInfo() === "network_error" ||
                    this.getNetworkInfo() === "not_loggedin"
                      ? defaultColors.ERROR_COLOR
                      : this.state.cloudActive
                      ? defaultColors.PRIMARY_COLOR
                      : undefined
                }}
              />
              <div
                style={{
                  fontSize: 14,
                  margin: -15,
                  textAlign: "center"
                }}
              >
                {this.getCloudText()}
              </div>
            </div>
            <div style={{ top: "20%", left: "65%", position: "absolute" }}>
              <FontAwesomeIcon
                icon={faFile}
                style={{
                  color: this.state.localActive
                    ? defaultColors.PRIMARY_COLOR
                    : undefined
                }}
              />
              <div style={{ fontSize: 14, margin: -15, textAlign: "center" }}>
                Local save {this.state.localActive ? "active" : "inactive"}
              </div>
            </div>
            <div
              style={{
                fontSize: 14,
                position: "absolute",
                top: "55%"
              }}
            >
              <div
                style={{
                  paddingLeft: 40,
                  paddingRight: 40,
                  marginTop: -20,
                  paddingBottom: 10
                }}
              >
                <Button
                  icon={faWifi}
                  disabled={
                    this.getNetworkInfo() === "loggedin" ||
                    this.getNetworkInfo() === "not_loggedin"
                  }
                  title="Re-check connection"
                  onClick={() => {}}
                />
              </div>
              <div
                style={{
                  textAlign: "center"
                }}
              >
                You can save the project as a Web or Local project or the both,
                just click on web project or/and local project buttons.
              </div>
              <div style={{ fontSize: 16, paddingLeft: 20, paddingTop: 15 }}>
                <div style={{ fontWeight: "bolder" }}>Save as a</div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Checkbox
                    checked={this.state.cloudActive}
                    label="Cloud Project"
                    disabled={this.getNetworkInfo() !== "loggedin"}
                    onClick={this.toggleCloudActive}
                  />
                  <Checkbox
                    checked={this.state.localActive}
                    label="Local project"
                    onClick={this.toggleLocalActive}
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-sm-8"
            style={{
              height: window.innerHeight - 30,
              overflow: "hidden",
              paddingTop: 30,
              paddingLeft: 80,
              paddingRight: 10
            }}
          >
            <InputBox
              id="fileName"
              error={this.state.errors.fileName}
              value={this.state.data.fileName}
              label="File Name"
              onChange={(key, val) => this.setChanges(key, val)}
            />
            <div style={{ paddingTop: 10 }}>
              <InputBox
                id="filePath"
                error={this.state.errors.filePath}
                value={this.state.data.filePath}
                disabled={!this.state.localActive}
                label="Local File Path"
                onChange={(key, val) => this.setChanges(key, val)}
              />
            </div>
            <div style={{ paddingLeft: 120, paddingRight: 80 }}>
              <Button title="Browse" onClick={() => this.openSaveDialog()} />
            </div>
            <div style={{ paddingTop: 20 }}>
              <Textarea
                error={this.state.errors.description}
                value={this.state.data.description}
                label="Description"
                onChange={(key, val) => this.setChanges(key, val)}
                id="description"
                maxLength={100}
              />
            </div>
            <div
              style={{
                width: "100%",
                height: 40,
                color: defaultColors.ERROR_COLOR,
                textAlign: "center",
                fontWeight: "bolder"
              }}
            >
              {this.state.errors.main}
            </div>
            <div
              style={{
                paddingTop: 10,
                paddingLeft: 120,
                paddingRight: 120,
                display: "flex",
                justifyContent: "space-between"
              }}
            >
              {!this.state.errors.main ? (
                <Button
                  disabled={!(this.state.cloudActive || this.state.localActive)}
                  icon={faPlusSquare}
                  title="Create New"
                  onClick={() => this.onClickCreate()}
                />
              ) : (
                <Button
                  disabled={!(this.state.cloudActive || this.state.localActive)}
                  icon={faPlus}
                  title="Continue"
                  onClick={() => this.onClickCreate(true)}
                />
              )}
              <Button
                icon={faTimesCircle}
                title="Cancel"
                onClick={this.closeNewrojectScreen}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapActionsToProps = {
  saveNewProjectData
};

export default connect(null, mapActionsToProps)(NewProjectScreen);
