import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFile,
  faCheck,
  faTimes,
  faCloud,
  faTimesCircle
} from "@fortawesome/free-solid-svg-icons";
import { defaultColors } from "../constants/Colors";
import Loading from "../components/common/Loading";
import { connect } from "react-redux";
import { Store } from "../../redux/reducers";
import Button from "../components/form/Button";
import { remote, ipcRenderer } from "electron";
import { initialProjectData } from "../project_data/InitialProjectData";
import fs from "fs";
import path from "path";
import { openProject } from "../../redux/actions/ProjectActions";
import { Project } from "../../interfaces/Project";
import RecentProjects from "../services/RecentProjects";
import { IpcMessages } from "../../IpcMessages";

type SavingState = "saving" | "done" | "error" | "inactive";

type CloudConnectionType =
  | "no_network"
  | "not_loggedin"
  | "loggedin"
  | "network_error";

interface State {
  localSaveState: SavingState;
  cloudSaveState: SavingState;
  isLocalActive: boolean;
  error: string;
  isComplete: boolean;
}

interface Props {
  localActive: boolean;
  cloudActive: boolean;
  description: string;
  fileName: string;
  filePath: string;
  openProject: (project: Project) => void;
}

class SaveProjectScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      localSaveState: "inactive",
      cloudSaveState: "inactive",
      isLocalActive: props.localActive,
      error: "",
      isComplete: true
    };
  }

  //TODO:: Add webguard
  closeNewrojectScreen = () => {
    const window = remote.getCurrentWindow();
    window.close();
  };

  //TODO::Add arithmetic to check loggedin or not
  getNetworkInfo = (): CloudConnectionType => {
    return "loggedin";
  };

  getSavingLogo = (state: SavingState) => {
    switch (state) {
      case "done":
        return (
          <FontAwesomeIcon
            icon={faCheck}
            style={{ color: defaultColors.PRIMARY_COLOR }}
          />
        );
      case "inactive":
        return null;
      case "error":
        return (
          <FontAwesomeIcon
            icon={faTimes}
            style={{ color: defaultColors.ERROR_COLOR }}
          />
        );
      case "saving":
        return <Loading width={30} height={30} />;
    }
  };

  getSavingState = (state: SavingState) => {
    switch (state) {
      case "done":
        return <div>Save complete</div>;
      case "error":
        return (
          <div>
            Error occured! to Try again,{" "}
            <span className="clickableText">Click Here</span>
          </div>
        );
      case "saving":
        return <div>Creating...</div>;
      case "inactive":
        return null;
    }
  };

  getIcon = () => {
    if (this.state.isLocalActive) {
      return <FontAwesomeIcon icon={faFile} />;
    } else {
      return <FontAwesomeIcon icon={faCloud} />;
    }
  };

  getInitData = () => {
    const initProjectData = initialProjectData();
    initProjectData.description = this.props.description;
    initProjectData.filePath = this.props.filePath;
    initProjectData.fileName = this.props.fileName;
    return initProjectData;
  };

  //TODO:: Add webguard
  saveLocal = (initProjectData: Project) => {
    if (this.props.localActive) {
      this.setState({ localSaveState: "saving" });

      const jsonData = JSON.stringify(initProjectData);

      fs.writeFile(
        path.join(this.props.filePath, this.props.fileName),
        jsonData,
        err => {
          if (err) {
            this.setState({
              localSaveState: "error",
              error: "Cannot proceed with a local file save faliure"
            });
          } else {
            this.setState({ localSaveState: "done", error: "" });
            RecentProjects.addData({
              filePath: path.join(this.props.filePath, this.props.fileName),
              type: "local",
              lastModified: Date.now(),
              description: this.props.description
            });
            RecentProjects.saveData();
            if (this.props.cloudActive) {
              this.saveWeb(initProjectData);
            } else {
              this.setState({ isComplete: true });
              this.props.openProject(initProjectData);
            }
          }
        }
      );
    }
  };

  //TODO:: Finish this
  saveWeb = (projectData: Project) => {
    //Arithmetic goes here and add arithmeti to how to cal isComplete
    this.setState({ isComplete: true });
    this.props.openProject(projectData);
  };

  //TODO:: Add webguard
  onClickDone = () => {
    ipcRenderer.send(IpcMessages.CLOSE_NEW_PROJECT_PAGE);
  };

  componentDidMount = () => {
    if (this.props.localActive) {
      this.saveLocal(this.getInitData());
    } else {
      this.saveWeb(this.getInitData());
    }
  };

  render() {
    return (
      <div>
        <div>
          <div className="row">
            <div
              className="col-sm-4"
              style={{
                fontSize: 110,
                paddingLeft: 40,
                paddingTop: 20,
                width: "100%",
                display: "flex",
                justifyContent: "center"
              }}
            >
              {this.getIcon()}
            </div>
            <div className="col-sm-8">
              <div
                style={{
                  paddingTop: 0,
                  fontSize: 15,
                  display: "flex",
                  alignItems: "center",
                  height: 90
                }}
              >
                <div>
                  {this.props.localActive &&
                    this.state.localSaveState !== "inactive" && (
                      <div
                        style={{
                          display: "flex",
                          paddingLeft: 40,
                          paddingRight: 40,
                          alignItems: "center"
                        }}
                      >
                        {this.getSavingLogo(this.state.localSaveState)}
                        <div style={{ paddingLeft: 10 }}>
                          Local File: &nbsp;
                        </div>
                        {this.getSavingState(this.state.localSaveState)}
                      </div>
                    )}
                  {this.props.cloudActive &&
                    this.getNetworkInfo() === "loggedin" &&
                    this.state.cloudSaveState !== "inactive" && (
                      <div
                        style={{
                          display: "flex",
                          paddingLeft: 40,
                          paddingRight: 40,
                          alignItems: "center"
                        }}
                      >
                        {this.getSavingLogo(this.state.cloudSaveState)}
                        <div style={{ paddingLeft: 10 }}>
                          Cloud File: &nbsp;
                        </div>
                        {this.getSavingState(this.state.cloudSaveState)}
                      </div>
                    )}
                </div>
              </div>
              <div
                style={{
                  width: "100%",
                  height: 20,
                  textAlign: "center",
                  color: defaultColors.ERROR_COLOR
                }}
              >
                {this.state.error}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingLeft: 100,
                  paddingRight: 100
                }}
              >
                {!this.state.isComplete ? (
                  <Button
                    icon={faTimesCircle}
                    title="Cancel"
                    onClick={this.closeNewrojectScreen}
                  />
                ) : (
                  <Button
                    icon={faCheck}
                    title="Done"
                    onClick={() => this.onClickDone()}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store: Store) => {
  return {
    ...store.saveProject
  };
};

const mapDispatchToProps = {
  openProject
};

export default connect(mapStateToProps, mapDispatchToProps)(SaveProjectScreen);
