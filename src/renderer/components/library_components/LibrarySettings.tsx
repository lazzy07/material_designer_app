import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSync,
  faThList,
  faTh,
  faThLarge,
} from "@fortawesome/free-solid-svg-icons";
import { defaultColors } from "../../constants/Colors";

export type THUMBNAIL_TYPES = "list" | "thumb" | "thumblarge";

interface Props {
  selected: THUMBNAIL_TYPES;
  onClickThumbType: (type: THUMBNAIL_TYPES) => void;
  onClickRefresh: () => void;
}

interface State {}

export default class LibrarySettings extends Component<Props, State> {
  render() {
    const { selected } = this.props;
    return (
      <div
        style={{
          paddingTop: 5,
          paddingRight: 20,
          marginBottom: -8,
          fontSize: 12,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <div
          className="clickable"
          style={{
            padding: 5,
            marginRight: 15,
          }}
          onClick={this.props.onClickRefresh}
        >
          <FontAwesomeIcon
            icon={faSync}
            style={{
              padding: 0,
              margin: 0,
            }}
          />
        </div>
        <div
          className="clickable"
          style={{ padding: 5 }}
          onClick={() => this.props.onClickThumbType("list")}
        >
          <FontAwesomeIcon
            icon={faThList}
            style={{
              padding: 0,
              margin: 0,
              color:
                selected === "list" ? defaultColors.PRIMARY_COLOR : undefined,
            }}
          />
        </div>
        <div
          className="clickable"
          style={{ padding: 5 }}
          onClick={() => this.props.onClickThumbType("thumb")}
        >
          <FontAwesomeIcon
            icon={faTh}
            style={{
              padding: 0,
              margin: 0,
              color:
                selected === "thumb" ? defaultColors.PRIMARY_COLOR : undefined,
            }}
          />
        </div>
        <div
          className="clickable"
          style={{ padding: 5 }}
          onClick={() => this.props.onClickThumbType("thumblarge")}
        >
          <FontAwesomeIcon
            icon={faThLarge}
            style={{
              padding: 0,
              margin: 0,
              color:
                selected === "thumblarge"
                  ? defaultColors.PRIMARY_COLOR
                  : undefined,
            }}
          />
        </div>
      </div>
    );
  }
}
