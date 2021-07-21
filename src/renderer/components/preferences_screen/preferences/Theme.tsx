import {
  faDownload,
  faSave,
  faTimesCircle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import React, { Component } from "react";
import Button from "../../form/Button";
import ColorSelect from "../../form/ColorSelect";
import Select from "../../form/Select";

export default class Theme extends Component {
  render() {
    return (
      <div style={{ height: "90vh" }}>
        <div className="container-fluid">
          <div>Select a theme or create a one</div>
          <Select
            onChange={() => {}}
            value={{ label: "abc", value: "abc" }}
            options={[
              { label: "abc", value: "bcd" },
              { label: "bcd", value: "abc" },
            ]}
          />
          <div>
            <ColorSelect
              id="color1"
              screen="preferences"
              color="#e8232d"
              onChange={(val) => console.log(val)}
              title="Font Color"
            />
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 20,
            left: "0%",
            display: "flex",
            width: "100%",
            justifyContent: "space-around",
          }}
        >
          <Button icon={faSave} title="Save" onClick={() => {}} />
          <Button icon={faDownload} title="Load Default" onClick={() => {}} />
          <Button icon={faTrash} title="Delete" onClick={() => {}} />
          <Button icon={faTimesCircle} title="Close" onClick={() => {}} />
        </div>
      </div>
    );
  }
}
