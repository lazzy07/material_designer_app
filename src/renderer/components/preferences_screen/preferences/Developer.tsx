import React, { Component } from "react";
import DeveloperSettings from "../../../settings/DeveloperSettings";
import Settings from "../../../settings/Settings";
import Checkbox from "../../form/Checkbox";

export default class Developer extends Component {
  state = {
    ...DeveloperSettings,
  };

  onChange = (key: string, val: any) => {
    DeveloperSettings[key] = val;
    this.setState({ [key]: val });
    Settings.saveSettings();
  };

  render() {
    return (
      <div>
        <div className="container-fluid">
          <div>Set developer mode, to activate developer options</div>
          <Checkbox
            label="Developer Mode"
            checked={this.state.developerMode}
            onClick={() =>
              this.onChange("developerMode", !DeveloperSettings.developerMode)
            }
          />
          <div className="helper-text">
            * Activating developer mode will enable the options only available
            for developers, if you are not a developer, its recommended to keep
            this option turned off
          </div>
        </div>
      </div>
    );
  }
}
