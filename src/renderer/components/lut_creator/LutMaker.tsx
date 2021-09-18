import React, { Component, createRef } from "react";
import { ColorLUT } from "../../../interfaces/ColorLutData";
import LutHandle from "./LutHandle";

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

  setSelected = (id: number) => {
    this.setState({
      selected: id,
    });
  };

  renderHandle = (pos: number, color: string, key: number) => {
    return (
      <LutHandle
        color={color}
        key={key}
        id={key}
        pos={pos}
        selected={this.state.selected}
        setSelected={this.setSelected}
        removeHandle={this.removeHandle}
      />
    );
  };

  renderHandles = () => {
    if (this.lutRef.current) {
      let lutWidth = this.state.lutWidth;

      return this.props.val.map((ele, index) => {
        const pos = lutWidth * ele.position;
        return this.renderHandle(pos, ele.color, index);
      });
    } else {
      return <div></div>;
    }
  };

  createNewPoint = (mouseX: number, color = "#000000") => {
    let data = [...this.props.val];
    let lutX = this.lutRef.current!.getBoundingClientRect().left;
    let lutWidth = this.state.lutWidth;

    let position = (mouseX - lutX) / lutWidth;

    const d = {
      color,
      position,
    };

    data.push(d);

    data.sort((a, b) => {
      return a.position - b.position;
    });

    this.setSelected(data.indexOf(d));

    this.props.onChange(data);
  };

  removeHandle = (index: number) => {
    const data = [...this.props.val];

    data.splice(index, 1);

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
          style={{
            position: "relative",
          }}
        >
          {this.renderHandles()}
        </div>
        <div
          ref={this.lutRef}
          style={{
            width: "100%",
            height: "45px",
            backgroundColor: "red",
            cursor: "pointer",
          }}
        ></div>
      </div>
    );
  }
}
