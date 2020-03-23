import React, { Component } from "react";
import Loading from "../components/Loading";
import { startKeyboardListners } from "../listners/editor_listners/EditorKeyboardListners";
import BottomStatus from "../components/editor_page/BottomStatus";
import { GoldenLayoutComponent } from "../components/editor_page/golden_layout/GoldenLayoutComponent";
import GraphScreen from "../components/editor_page/editor_components/GraphScreen";
import { defaultColors } from "../constants/Colors";

interface Props {}

interface State {
  loading: boolean;
}

export default class EditorScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      loading: true
    };
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
          <GoldenLayoutComponent //config from simple react example: https://golden-layout.com/examples/#qZXEyv
            htmlAttrs={{
              style: {
                height: window.innerHeight - 63,
                width: "100%",
                paddingTop: 6,
                backgroundColor: defaultColors.IMPORTANT_BACKGROUND_COLOR
              }
            }}
            config={{
              content: [
                {
                  type: "stack",
                  content: [
                    {
                      title: "A react component",
                      type: "react-component",
                      component: "testItem",
                      props: { value: "I'm on the left" }
                    },
                    {
                      title: "Another react component",
                      type: "react-component",
                      component: "testItem"
                    }
                  ]
                }
              ]
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
