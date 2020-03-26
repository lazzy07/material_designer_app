import React, { Component } from "react";
import Loading from "../components/Loading";
import { startKeyboardListners } from "../listners/editor_listners/EditorKeyboardListners";
import BottomStatus from "../components/editor_page/BottomStatus";
import { GoldenLayoutComponent } from "../components/editor_page/golden_layout/GoldenLayoutComponent";
import GraphScreen from "../components/editor_page/editor_components/GraphScreen";
import { defaultColors } from "../constants/Colors";
import { DEFAULT_LAYOUT } from "../components/editor_page/golden_layout/DefaultLayout";
import { IS_WEB } from "../services/Webguard";

interface Props {}

interface State {
  loading: boolean;
}

export default class EditorScreen extends Component<Props, State> {
  layout: any = DEFAULT_LAYOUT;

  constructor(props: Props) {
    super(props);

    this.state = {
      loading: true
    };

    if (!IS_WEB) {
      const lastPart = window.location.href.split("?")[1];
      const id = lastPart.split("&")[1];

      if (id) {
        if (id !== "main") {
          const strdata = localStorage.getItem("subEditorData");
          if (strdata) {
            const data = JSON.parse(strdata);

            for (let i of data) {
              if (i.id === id) {
                this.layout = i.config.content;
              }
            }
          }
        }
      }
    }
  }

  componentDidMount = () => {
    startKeyboardListners();
  };

  render() {
    return (
      <div
        style={{
          height: window.innerHeight - 63,
          width: "100%"
        }}
      >
        <div>
          <GoldenLayoutComponent
            htmlAttrs={{
              style: {
                height: window.innerHeight - 63,
                width: "100%",
                paddingTop: 6,
                backgroundColor: defaultColors.IMPORTANT_BACKGROUND_COLOR
              }
            }}
            config={{
              content: this.layout,
              settings: {
                showPopoutIcon: false,
                constrainDragToContainer: false
              }
            }}
            registerComponents={myLayout => {
              myLayout.registerComponent("testItem", GraphScreen);
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
