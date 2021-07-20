import React, { Component } from "react";
import Select from "../../form/Select";

export default class Theme extends Component {
  render() {
    return (
      <div>
        <div className="container-fluid">
          <div>Select a theme or create a one</div>
          <Select
            onChange={() => {}}
            value="abc"
            id="select"
            options={[
              { label: "abc", value: "bcd" },
              { label: "bcd", value: "abc" },
            ]}
          />
        </div>
      </div>
    );
  }
}
