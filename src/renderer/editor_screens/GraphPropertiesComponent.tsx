import React, { Component } from "react";
import Button from "../components/graph_property_inputs/Button";
import InputAndSlider1 from "../components/graph_property_inputs/InputAndSlider1";
import InputAndSlider2 from "../components/graph_property_inputs/InputAndSlider2";
import InputNumber from "../components/graph_property_inputs/InputNumber";
import InputString from "../components/graph_property_inputs/InputString";
import Slider1 from "../components/graph_property_inputs/Slider1";
import Slider2 from "../components/graph_property_inputs/Slider2";
import Switch from "../components/graph_property_inputs/Switch";
import ColorPicker3 from "../components/graph_property_inputs/ColorPicker3";
import ColorPicker1 from "../components/graph_property_inputs/ColorPicker1";
import Lut1 from "../components/graph_property_inputs/Lut1";
import { ColorLUT } from "../../interfaces/ColorLutData";
import "../scss/graphcomponentproperties.scss";
import { connect } from "react-redux";
import { Store } from "../../redux/reducers";
import { PackageElement } from "../../interfaces/PackageElement";

interface Props {
  selectedGraph: number;
  packages: PackageElement[];
}

interface State {
  colors: ColorLUT[];
}

class GraphPropertiesComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      colors: [
        {
          color: "#000000",
          pos: "0.0",
        },
        {
          color: "#ffffff",
          pos: "1.0",
        },
      ],
    };
  }

  render() {
    return <div></div>;
  }
}

const mapStateToProps = (state: Store) => {
  return {
    selectedGraph: state.system.selectedItems.node,
    packages: state.project.packages,
  };
};

export default connect(mapStateToProps)(GraphPropertiesComponent);
