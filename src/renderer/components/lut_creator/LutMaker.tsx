import React, { Component, createRef } from "react";
import { ColorLUT } from "../../../interfaces/ColorLutData";
import { defaultColors } from "../../constants/Colors";

type LUTType = "gradient" | "constant";

interface Props {
  val: ColorLUT[];
  onChange: (colorLut: ColorLUT[]) => void;
  onClickItem?: (index: number, color: string) => void;
  onDoubleClickItem?: (index: number, color: string) => void;
  lutType: LUTType;
}

interface State {
  selected: number;
  lutWidth: number;
}

export default class LutMaker extends Component<Props, State> {
  lutRef = createRef<HTMLDivElement>();

  constructor(props) {
    super(props);

    this.state = {
      selected: -1,
      lutWidth: 0,
    };
  }

  renderHandle = (pos: number, color: string) => {
    return (
      <div style={{ position: "absolute", left: pos }}>
        <div
          style={{
            height: "18px",
            width: "18px",
            borderRadius: "50%",
            transform: "translate(-50%, 0)",
            position: "absolute",
            top: -18,
            backgroundColor: defaultColors.HOVER_COLOR,
          }}
        ></div>
        <div
          style={{
            height: "45px",
            width: "3px",
            backgroundColor: defaultColors.HOVER_COLOR,
          }}
        ></div>
        <div
          style={{
            height: 15,
            width: 15,
            position: "relative",
            transform: "rotate(45deg) translate(-15%, 45%)",
            backgroundColor: defaultColors.HOVER_COLOR,
          }}
        ></div>
        <div
          style={{
            height: 20,
            width: 20,
            position: "relative",
            transform: "translate(-45%, -25%)",
            backgroundColor: color,
            border: "2px solid" + defaultColors.HOVER_COLOR,
          }}
        ></div>
      </div>
    );
  };

  renderHandles = () => {
    if (this.lutRef.current) {
      console.log("object");
      let lutWidth = this.lutRef.current.offsetWidth;

      for (const i of this.props.val) {
        const pos = lutWidth * i.position;

        return this.renderHandle(pos, i.color);
      }
    } else {
      return <div></div>;
    }
  };

  createNewPoint = (mouseX: number, color = "#000000") => {
    let data = [...this.props.val];
    let lutX = this.lutRef.current!.getBoundingClientRect().left;
    let lutWidth = this.state.lutWidth;

    let position = (mouseX - lutX) / lutWidth;

    data.push({
      color,
      position,
    });

    data.sort((a, b) => {
      return a.position - b.position;
    });

    this.props.onChange(data);
  };

  onClickLut = (e: MouseEvent) => {
    const mouseX = e.x;

    this.createNewPoint(mouseX);
  };

  handleResize = () => {
    this.setState({
      lutWidth: this.lutRef.current!.offsetWidth,
    });
  };

  componentDidMount() {
    const ref = this.lutRef.current!;
    ref.addEventListener("click", this.onClickLut);
    ref.addEventListener("resize", this.handleResize);

    this.setState({
      lutWidth: this.lutRef.current!.offsetWidth,
    });
  }

  componentWillUnmount() {
    const ref = this.lutRef.current!;
    ref.removeEventListener("click", this.onClickLut);
    ref.addEventListener("resize", this.handleResize);
  }

  render() {
    return (
      <div
        style={{
          width: "100%",
          minWidth: "200px",
          position: "relative",
          margin: 15,
          marginTop: 50,
        }}
      >
        <div
          ref={this.lutRef}
          style={{
            width: "100%",
            height: "45px",
            backgroundColor: "red",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              position: "relative",
            }}
          >
            {this.renderHandles()}
          </div>
        </div>
      </div>
    );
  }
}
