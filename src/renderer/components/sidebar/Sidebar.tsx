import React, { Component } from "react";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface SidebarMenu {
  title: string;
  selected: string;
  menus: Group[];
}

interface Group {
  title: string;
  onClick: () => void;
  icon: IconDefinition;
  submenu: Group[];
  clickable?: boolean;
}

interface Props {
  menu: SidebarMenu;
  setSelected: (title: string) => void;
}

interface State {}

export default class Sidebar extends Component<Props, State> {
  renderMenuItem = (
    ele: Group,
    index: number,
    fontSize: number = 20,
    paddingBottom: number = 0
  ) => {
    return (
      <div key={index} style={{ paddingBottom }}>
        <p
          onClick={() =>
            ele.clickable ? this.props.setSelected(ele.title) : undefined
          }
          className={`${ele.clickable ? "clickableAlt" : ""} ${
            this.props.menu.selected === ele.title ? "primaryColorText" : ""
          }`}
          style={{
            padding: 5,
            margin: 0,
            fontWeight: "bolder",
            fontSize
          }}
        >
          <FontAwesomeIcon icon={ele.icon} /> {ele.title}
        </p>
        <div style={{ marginLeft: 25 }}>
          {ele.submenu.map((e, i) => this.renderMenuItem(e, i, 15))}
        </div>
      </div>
    );
  };

  renderMenu = () => {
    const { menu } = this.props;

    return (
      <div>
        <div>
          <h5>{menu.title}</h5>
        </div>
        <div style={{ paddingTop: 5 }}>
          {menu.menus.map((ele, index) => {
            return this.renderMenuItem(ele, index, 20, 20);
          })}
        </div>
      </div>
    );
  };

  render() {
    return <div>{this.renderMenu()}</div>;
  }
}
