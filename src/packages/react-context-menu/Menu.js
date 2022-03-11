import React, { Component } from "react";
import PropTypes from "prop-types";

const baseStyle = {
  display: "inline-block",
  position: "relative",
  backgroundColor: "white",
  border: "1px solid gray",
  borderRadius: 2,
  boxShadow: "2px 1px 1px gray",
  listStyle: "none",
  padding: "3px 0px",
  margin: 0,
  lineHeight: "normal",
};

class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = { itemActive: null, submenuDisplay: false };

    this.handleKeyDown = this.handleKeyDown.bind(this);

    this.items = [];
  }

  handleMouseOver(i) {
    if (i !== this.state.itemActive) {
      if (this.delay) window.clearTimeout(this.delay);

      this.setState({ itemActive: i, submenuDisplay: false });

      const currentElmt = this.items[i];

      if (currentElmt && currentElmt.hasSubmenu && currentElmt.hasSubmenu()) {
        this.delay = window.setTimeout(
          () => this.setState({ submenuDisplay: true }),
          300
        );
      }
    }
  }

  handleKeyDown(e) {
    if (!this.props.display) return;

    const length = React.Children.count(this.props.children);
    const current = this.state.itemActive;
    const { submenuDisplay } = this.state;
    const currentElmt = this.items[current];
    const submenu = currentElmt && currentElmt.submenu;

    let newValue = null;

    switch (e.key) {
      case "ArrowDown":
        if (submenuDisplay) return;

        e.preventDefault();

        if (current === null || current + 1 >= length) newValue = 0;
        else newValue = current + 1;
        break;

      case "ArrowUp":
        if (submenuDisplay) return;

        e.preventDefault();

        if (current === null || current - 1 < 0) newValue = length - 1;
        else newValue = current - 1;
        break;

      case "ArrowLeft":
      case "Escape":
        if (submenuDisplay && (!submenu || !submenu.state.submenuDisplay)) {
          e.preventDefault();

          window.setTimeout(() => this.setState({ submenuDisplay: false }), 0);
        }
        break;

      case "ArrowRight":
        if (submenu && !submenuDisplay) {
          e.preventDefault();
          this.setState({ submenuDisplay: true });
        } else if (!submenuDisplay && current === -1) {
          e.preventDefault();
          newValue = 0;
        }
        break;

      case "Enter":
        if (!submenuDisplay) {
          if (submenu) {
            e.preventDefault();
            this.setState({ submenuDisplay: true });
          } else if (currentElmt && currentElmt.handleAction) {
            e.preventDefault();
            currentElmt.handleAction(e);
          }
        }
        break;

      default:
        if (!submenuDisplay) {
          const index = this.items.findIndex(
            (item) => item.props.shortcut === e.key
          );

          if (index !== -1) {
            e.preventDefault();
            newValue = index;
            if (this.items[index].handleAction)
              this.items[index].handleAction(e);
          }
        }

        break;
    }

    if (newValue !== null) this.setState({ itemActive: newValue });
  }

  setRef(i, elmt) {
    this.items[i] = elmt;
  }

  renderChildren() {
    let index = -1;

    return React.Children.map(this.props.children, (child) => {
      if (child.type && child.type.isReactDesktopMenuItem) {
        index++;

        const props = {
          active: index === this.state.itemActive,
          ref: this.setRef.bind(this, index),
          submenuDisplay:
            index === this.state.itemActive && this.state.submenuDisplay,
        };

        const onMouseOver = this.handleMouseOver.bind(this, index);

        if ("onMouseOver" in child.props) {
          const ownMouseOver = child.props.onMouseOver;

          props.onMouseOver = (e) => {
            ownMouseOver(e);
            onMouseOver(e);
          };
        } else props.onMouseOver = onMouseOver;

        if ("itemHoverColor" in this.props && !("activeColor" in child.props)) {
          props.activeColor = this.props.itemHoverColor;
        }

        if (!("keyboard" in child.props)) props.keyboard = this.props.keyboard;

        return React.cloneElement(child, props);
      } else return child;
    });
  }

  addKeyboardListener() {
    document.addEventListener("keydown", this.handleKeyDown);
  }

  removeKeyboardListener() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  componentDidMount() {
    if (this.props.keyboard) this.addKeyboardListener();
  }

  componentWillUnmount() {
    this.removeKeyboardListener();
  }

  componentDidUpdate(prevProps) {
    // eslint-disable-next-line react/no-did-update-set-state
    if (!prevProps.display && this.props.display)
      this.setState({ itemActive: -1 });

    if (prevProps.keyboard && !this.props.keyboard)
      this.removeKeyboardListener();
    else if (!prevProps.keyboard && this.props.keyboard)
      this.addKeyboardListener();
  }

  render() {
    const { display, style, ...rest } = this.props;

    delete rest.children;
    delete rest.label;
    delete rest.onAction;
    delete rest.itemHoverColor;
    delete rest.keyboard;

    if (!display) return null;

    return (
      <ul
        {...rest}
        style={{ ...baseStyle, ...style }}
        ref={(node) => (this.node = node)}
      >
        {this.renderChildren()}
      </ul>
    );
  }
}

Menu.propTypes = {
  children: PropTypes.node,
  display: PropTypes.bool,
  style: PropTypes.object,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  itemHoverColor: PropTypes.string,
  keyboard: PropTypes.bool,
};

Menu.defaultProps = { display: true };

Menu.isReactDesktopMenu = true;

export default Menu;
