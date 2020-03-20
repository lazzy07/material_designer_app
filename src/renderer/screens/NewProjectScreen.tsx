import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudUploadAlt,
  faUserSlash,
  faBan,
  IconDefinition,
  faWifi,
  faExclamationCircle,
  faFile
} from "@fortawesome/free-solid-svg-icons";
import Checkbox from "../components/form/Checkbox";
import Button from "../components/form/Button";
import { defaultColors } from "../constants/Colors";
import InputBox from "../components/form/InputBox";

type CloudConnectionType =
  | "no_network"
  | "not_loggedin"
  | "loggedin"
  | "network_error";

interface State {
  cloudActive: boolean;
  localActive: boolean;
}

interface Props {}

export default class NewProjectScreen extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      cloudActive: false,
      localActive: true
    };
  }

  //TODO::Add arithmetic to check loggedin or not
  getNetworkInfo = (): CloudConnectionType => {
    return "no_network";
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
              paddingTop: 50,
              paddingLeft: 80,
              paddingRight: 10
            }}
          >
            <InputBox
              id="fileName"
              value="New File"
              label="File Name"
              onChange={() => {}}
            />
            <InputBox
              id="filePath"
              value="File Path"
              label="File Path"
              onChange={() => {}}
            />
          </div>
        </div>
      </div>
    );
  }
}
