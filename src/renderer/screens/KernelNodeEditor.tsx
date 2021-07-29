import React, { Component } from "react";
import { Dimensions } from "../../interfaces/Dimensions";
import { GoldenLayoutComponent } from "../components/editor_page/golden_layout/GoldenLayoutComponent";
import { defaultColors } from "../constants/Colors";
import BottomStatus from "../components/editor_page/BottomStatus";
import { KERNEL_NODE_LAYOUT } from "../components/editor_page/golden_layout/KernelNodeEditorLayout";

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
                ...this.settings,
              },
              ...this.config,
              trigger: this.state.trigger,
            }}
            registerComponents={(myLayout) => {
              this.currentLayout = myLayout;
              myLayout.registerComponent("nodes", NodesScreen);
              myLayout.registerComponent("hdris", HdrisScreen);
              myLayout.registerComponent("textures", TexturesScreen);
              myLayout.registerComponent("preview3d", Preview3DScreen);
              myLayout.registerComponent("graphEditor", GraphEditorScreen);
              myLayout.registerComponent("nodePreview", NodePreviewScreen);
              myLayout.registerComponent("outliner", OutlinerScreen);
              myLayout.registerComponent("nodeProps", NodePropsScreen);
              myLayout.registerComponent("graphProps", GraphPropsScreen);
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
