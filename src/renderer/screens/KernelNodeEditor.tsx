import React, { Component } from "react";
import { Dimensions } from "../../interfaces/Dimensions";
import { GoldenLayoutComponent } from "../components/editor_page/golden_layout/GoldenLayoutComponent";
import { defaultColors } from "../constants/Colors";
import BottomStatus from "../components/editor_page/BottomStatus";
import { KERNEL_NODE_LAYOUT } from "../components/editor_page/golden_layout/KernelNodeEditorLayout";
import KernelExplorer from "../kernelnode_editor_screens/KernelExplorerScreen";
import PreviewGraphScreen from "../kernelnode_editor_screens/PreviewGraphScreen";
import PreviewScreen from "../kernelnode_editor_screens/PreviewScreen";
import FunctionsScreen from "../kernelnode_editor_screens/FunctionsScreen";
import KernelScreen from "../kernelnode_editor_screens/KernelScreen";
import DatagraphScreen from "../kernelnode_editor_screens/DatagraphScreen";

interface Props {}

interface State {
  loading: boolean;
  trigger: boolean;
  dimensions: Dimensions;
}

export default class KernelNodeEditor extends Component<any, State> {
  settings: any;
  config: any;
  currentLayout: any;
  resizeTimer: any;

  layout: any = KERNEL_NODE_LAYOUT;

  constructor(props: Props) {
    super(props);

    this.state = {
      loading: false,
      trigger: false,
      dimensions: { height: window.innerHeight, width: window.innerWidth },
    };
  }

  doneResizing = () => {
    this.setState({
      dimensions: { width: window.innerWidth, height: window.innerHeight },
    });
    if (this.currentLayout)
      this.currentLayout.updateSize(window.innerWidth, window.innerHeight - 63);
  };

  componentDidMount() {
    window.addEventListener("resize", (e) => {
      clearTimeout(this.resizeTimer);
      this.resizeTimer = setTimeout(this.doneResizing, 100);
    });
  }

  render() {
    return (
      <div
        style={{
          height: this.state.dimensions.height - 63,
          width: this.state.dimensions.width,
        }}
      >
        <div>
          <GoldenLayoutComponent
            noPopout
            htmlAttrs={{
              style: {
                height: this.state.dimensions.height - 53,
                width: this.state.dimensions.width,
                paddingTop: 6,
                backgroundColor: defaultColors.IMPORTANT_BACKGROUND_COLOR,
              },
            }}
            config={{
              content: this.layout,
              settings: {
                showPopoutIcon: false,
                constrainDragToContainer: false,
                showMaximiseIcon: false,
                showCloseIcon: false,
                ...this.settings,
              },
              ...this.config,
              trigger: this.state.trigger,
            }}
            registerComponents={(myLayout) => {
              this.currentLayout = myLayout;
              myLayout.registerComponent("kernelexplorer", KernelExplorer);
              myLayout.registerComponent("previewscreen", PreviewScreen);
              myLayout.registerComponent("previewgraph", PreviewGraphScreen);
              myLayout.registerComponent("functions", FunctionsScreen);
              myLayout.registerComponent("kernel", KernelScreen);
              myLayout.registerComponent("datagraph", DatagraphScreen);
            }}
          />
        </div>
        <div>
          <BottomStatus />
        </div>
      </div>
    );
  }
}
