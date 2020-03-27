import React, { Component } from "react";
import { startKeyboardListners } from "../listners/editor_listners/EditorKeyboardListners";
import BottomStatus from "../components/editor_page/BottomStatus";
import { GoldenLayoutComponent } from "../components/editor_page/golden_layout/GoldenLayoutComponent";
import GraphEditorScreen from "../components/editor_page/editor_components/GraphEditorScreen";
import { defaultColors } from "../constants/Colors";
import { DEFAULT_LAYOUT } from "../components/editor_page/golden_layout/DefaultLayout";
import { IS_WEB } from "../services/Webguard";
import { ElementsToLocalStorage } from "../../EditorElements/ElementsToLocalStorage";
import { IpcMessages } from "../../IpcMessages";
import { ipcRenderer } from "electron";
import NodesScreen from "../components/editor_page/editor_components/NodesScreen";
import HdrisScreen from "../components/editor_page/editor_components/HdrisScreen";
import TexturesScreen from "../components/editor_page/editor_components/TexturesScreen";
import Preview3DScreen from "../components/editor_page/editor_components/Preview3DScreen";
import NodePreviewScreen from "../components/editor_page/editor_components/NodePreviewScreen";
import OutlinerScreen from "../components/editor_page/editor_components/OutlinerScreen";
import NodePropsScreen from "../components/editor_page/editor_components/NodePropsScreen";
import GraphPropsScreen from "../components/editor_page/editor_components/GraphPropsScreen";

interface Props {}

interface State {
  loading: boolean;
  trigger: boolean;
}

export default class EditorScreen extends Component<Props, State> {
  layout: any = DEFAULT_LAYOUT;
  settings: any;
  config: any;

  constructor(props: Props) {
    super(props);

    this.state = {
      loading: false,
      trigger: false
    };

    if (!IS_WEB) {
      const lastPart = window.location.href.split("?")[1];
      const id = lastPart.split("&")[1];
      if (id) {
        if (id !== "main") {
          //This only executes in the sub screen
          this.loadingSubEditorSettings(id);
        }
      } else {
        //This executes in the main screen
        this.loadingMainEditorSettings();
        this.loadingSubEditors();
      }
    }
  }

  loadingSubEditors = () => {
    ElementsToLocalStorage.initData();
    const data = ElementsToLocalStorage.data;

    for (let i of data) {
      const ipcRenderer = require("electron").ipcRenderer;
      ipcRenderer.send(IpcMessages.OPEN_SUB_EDITOR_PAGE, {
        id: i.id,
        layout: i.config
      });
    }
  };

  loadingMainEditorSettings = () => {
    const data = localStorage.getItem("mainConfig");

    if (data) {
      let d = JSON.parse(data);
      this.layout = d.content;
      this.settings = d.settings;
      this.config = d;
    }
  };

  loadingSubEditorSettings = (id: string) => {
    const strdata = localStorage.getItem("subEditorData");
    if (strdata) {
      const data = JSON.parse(strdata);

      for (let i of data) {
        if (i.id === id) {
          this.layout = i.config.content;
          this.settings = {
            showMaximiseIcon: false,
            showCloseIcon: false,
            ...i.config.settings
          };
        }
      }
    }
  };

  listenResetLayout = () => {
    window.addEventListener("loadDefaultLayout", () => {
      localStorage.removeItem("mainConfig");
      localStorage.removeItem("subEditorData");
      ipcRenderer.send(IpcMessages.CLOSE_ALL_SUB_EDITORS);
      window.location.reload(false);
    });
  };

  componentDidMount = () => {
    startKeyboardListners();
    this.listenResetLayout();
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
                constrainDragToContainer: false,
                ...this.settings
              },
              ...this.config,
              trigger: this.state.trigger
            }}
            registerComponents={myLayout => {
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
