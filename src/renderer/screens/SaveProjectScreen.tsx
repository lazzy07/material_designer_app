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
import { remote } from "electron";

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
}

interface Props {
  localActive: boolean;
  cloudActive: boolean;
  description: string;
  fileName: string;
  filePath: string;
}

class SaveProjectScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      localSaveState: "done",
      cloudSaveState: "saving",
      isLocalActive: props.localActive
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

  canContinue = () => {
    if (this.props.localActive) {
      if (this.state.localSaveState === "done") {
        if (this.props.cloudActive) {
          if (
            this.state.cloudSaveState === "error" ||
            this.state.cloudSaveState === "done"
          ) {
            return true;
          }
        } else {
          return true;
        }
      }
    } else {
      if (this.state.cloudSaveState === "done") {
        return true;
      }
    }
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
                  paddingTop: 20,
                  fontSize: 18,
                  display: "flex",
                  alignItems: "center",
                  height: 110
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
                  display: "flex",
                  justifyContent: "space-between",
                  paddingLeft: 100,
                  paddingRight: 100
                }}
              >
                <Button icon={faCheck} title="Done" onClick={() => {}} />
                <Button
                  icon={faTimesCircle}
                  title="Cancel"
                  onClick={this.closeNewrojectScreen}
                />
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

export default connect(mapStateToProps)(SaveProjectScreen);
