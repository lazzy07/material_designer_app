import React, { Component } from "react";
import { defaultColors } from "../../../renderer/constants/Colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faCloud } from "@fortawesome/free-solid-svg-icons";
import { ProjectFile } from "../../../interfaces/ProjectFile";
import path from "path";

interface State {}

interface Props {
  file: ProjectFile;
  selected: boolean;
}

export default class ProjectFileElement extends Component<Props, State> {
  getFilepath = (filePath: string): [string, string] => {
    const obj = path.parse(filePath);

    if (obj) {
      return [obj.dir, obj.name];
    }

    return ["error", "error"];
  };

  getDate = (d: number) => {
    const date = new Date(d);
    return date.toLocaleString();
  };

  render() {
    const fp = this.getFilepath(this.props.file.filePath);
    return (
      <div>
        <div
          className={`${
            this.props.selected ? "hoverPrimaryBorderColor" : "hoverBorderColor"
          }`}
          style={{
            backgroundColor: defaultColors.IMPORTANT_BACKGROUND_COLOR,
            minHeight: 80,
            width: "100%",
            marginTop: 5,
            marginBottom: 5,
            padding: 10,
            display: "flex",
            cursor: "pointer"
          }}
        >
          <div style={{ paddingRight: 10, fontSize: 25 }}>
            <FontAwesomeIcon
              icon={this.props.file.type === "local" ? faFile : faCloud}
            />
          </div>
          <div style={{ width: "100%" }}>
            <div style={{ fontSize: 12 }}>
              {fp[0]}\
              <span
                style={{
                  color: defaultColors.PRIMARY_COLOR,
                  fontWeight: "bolder",
                  fontSize: 13
                }}
              >
                {fp[1]}
              </span>
            </div>
            <div
              style={{
                fontSize: 11,
                padding: 5
              }}
            >
              {this.props.file.description}
            </div>
            <div style={{ width: "100%", fontSize: 10, textAlign: "end" }}>
              Created At :&nbsp;{" "}
              <span style={{ letterSpacing: 1 }}>
                {this.getDate(this.props.file.lastModified)}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
