import React, { Component } from "react";
import { connect } from "react-redux";
import { DeveloperSettings } from "../../../../interfaces/DeveloperSettings";
import { setDeveloperSettings } from "../../../../redux/actions/PreferencesActions";
import { Store } from "../../../../redux/reducers";
import Checkbox from "../../form/Checkbox";

interface Props {
  developerSettings: DeveloperSettings;
  setDeveloperSettings: (settings: DeveloperSettings) => void;
}

class Developer extends Component<Props> {
  onChange = (key: string, val: any) => {
    this.props.setDeveloperSettings({
      ...this.props.developerSettings,
      [key]: val,
    });
  };

  render() {
    return (
      <div>
        <div className="container-fluid">
          <div style={{ paddingBottom: "10px" }}>
            Set developer mode, to activate developer options
          </div>
          <Checkbox
            label="Developer Mode"
            checked={this.props.developerSettings.developerMode}
            onClick={() =>
              this.onChange(
                "developerMode",
                !this.props.developerSettings.developerMode
              )
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

const mapStateToProps = (state: Store) => {
  return {
    developerSettings: state.preferences.developerSettings,
  };
};

const mapDispatchToProps = {
  setDeveloperSettings,
};

export default connect(mapStateToProps, mapDispatchToProps)(Developer);
