import React, { Component, createRef } from "react";
import { defaultColors } from "../../constants/Colors";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  id: number;
  pos: number;
  removeHandle: (key: number) => void;
  setSelected: (key: number) => void;
  color: string;
  selected: number;
}

export default class LutHandle extends Component<Props> {
  ref = createRef<HTMLDivElement>();

  dragHandler = (e: DragEvent) => {
    var img = new Image();
    img.src =
      "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=";
    e.dataTransfer!.setDragImage(img, 0, 0);
  };

  componentDidMount() {
    this.ref.current?.addEventListener("dragstart", this.dragHandler);
  }

  componentWillUnmount() {
    this.ref.current?.removeEventListener("dragstart", this.dragHandler);
  }

  render() {
    const isSelected = this.props.selected === this.props.id;
    const col = isSelected
      ? defaultColors.IMPORTANT_FONT_COLOR
      : defaultColors.HOVER_COLOR;
    const { id, pos, removeHandle, color } = this.props;

    return (
      <div
        draggable
        ref={this.ref}
        style={{ position: "absolute", left: pos, width: 3 }}
      >
        <div
          style={{
            height: "18px",
            width: "18px",
            borderRadius: "50%",
            transform: "translate(-50%, 0)",
            position: "absolute",
            top: -18,
            backgroundColor: col,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => {
            removeHandle(id);
            this.props.setSelected(-1);
          }}
        >
          <FontAwesomeIcon
            color={
              isSelected ? defaultColors.IMPORTANT_BACKGROUND_COLOR : undefined
            }
            icon={faTimes}
            style={{ fontSize: "14px" }}
          />
        </div>
        <div
          style={{
            height: "45px",
            width: "3px",
            backgroundColor: col,
          }}
        ></div>
        <div
          style={{
            height: 10,
            width: 10,
            position: "relative",
            transform: "rotate(45deg) translate(-15%, 45%)",
            cursor: "pointer",
            backgroundColor: isSelected
              ? defaultColors.IMPORTANT_FONT_COLOR
              : defaultColors.HOVER_COLOR,
          }}
        ></div>
        <div
          style={{
            height: 15,
            width: 15,
            position: "relative",
            transform: "translate(-45%, -25%)",
            cursor: "pointer",
            backgroundColor: color,
            border: "2px solid" + col,
          }}
          onClick={() => this.props.setSelected(id)}
        ></div>
      </div>
    );
  }
}
