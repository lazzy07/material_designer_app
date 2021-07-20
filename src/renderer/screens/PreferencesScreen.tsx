import React, { Component } from "react";
import Addons from "../components/preferences_screen/preferences/Addons";
import Cloud from "../components/preferences_screen/preferences/Cloud";
import Developer from "../components/preferences_screen/preferences/Developer";
import General from "../components/preferences_screen/preferences/General";
import NodeTheme from "../components/preferences_screen/preferences/NodeTheme";
import System from "../components/preferences_screen/preferences/System";
import Theme from "../components/preferences_screen/preferences/Theme";
import SideNavigation from "../components/preferences_screen/SideNavigation";
import "../scss/preferences.scss";

const NAVIGATION_ITEMS = [
  "General",
  "Theme",
  "Node Theme",
  "System",
  "Developer",
  "Addons",
  "Cloud",
];

interface State {
  selected: string;
}

export default class PreferencesScreen extends Component<any, State> {
  constructor(props: undefined) {
    super(props);

    this.state = {
      selected: NAVIGATION_ITEMS[0],
    };
  }

  renderSelected = () => {
    switch (this.state.selected) {
      case "General":
        return <General />;
      case "Theme":
        return <Theme />;
      case "Node Theme":
        return <NodeTheme />;
      case "System":
        return <System />;
      case "Developer":
        return <Developer />;
      case "Addons":
        return <Addons />;
      case "Cloud":
        return <Cloud />;
      default:
        return <div></div>;
    }
  };

  render() {
    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-3" style={{ padding: 10 }}>
              <SideNavigation
                selected={this.state.selected}
                setSelected={(selected: string) =>
                  this.setState({ selected: selected })
                }
                navigationItems={NAVIGATION_ITEMS}
              />
            </div>
            <div className="col-9" style={{ padding: 10 }}>
              {this.renderSelected()}
            </div>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 10,
            left: 20,
            display: "flex",
          }}
        >
          <img
            src="/main_window/dependencies/img/icon_trans.png"
            alt=""
            style={{ width: "50px", height: "40px", paddingRight: 10 }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div style={{ fontSize: 12 }}>Material Designer</div>
            <div style={{ fontSize: 10 }}>Created by Cyborg Studios</div>
          </div>
        </div>
      </div>
    );
  }
}
