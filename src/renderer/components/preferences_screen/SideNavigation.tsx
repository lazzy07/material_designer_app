import React, { Component } from "react";

interface Props {
  navigationItems: string[];
  selected: string;
  setSelected: (selected: string) => void;
}

export default class SideNavigation extends Component<Props> {
  renderSideNavigationItem = (ele: string, key: number) => {
    return (
      <div
        className={
          this.props.selected === ele
            ? "preferences-side-nav-item-selected"
            : "preferences-side-nav-item"
        }
        key={key}
        style={{ padding: 5, paddingLeft: 10 }}
        onClick={() => this.props.setSelected(ele)}
      >
        <div style={{ fontWeight: "bolder" }}>{ele}</div>
      </div>
    );
  };

  renderSideNavigation = () => {
    return this.props.navigationItems.map((ele, key) => {
      return this.renderSideNavigationItem(ele, key);
    });
  };

  render() {
    return <div>{this.renderSideNavigation()}</div>;
  }
}
