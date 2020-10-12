import React from "react"
import PropTypes from "prop-types"

const styles = {

  li : {
    margin : 0,
    whiteSpace : "nowrap",
    lineHeight : "140%",
    padding : "2px 5px",
    cursor : "default",
    display : "flex",
    alignItems : "center",
    color : "#333"
  },

  icon : {
    width : 16,
    marginRight : 5,
    color : "black"
  },

  disabled : {
    color : "gray",
    fontStyle : "italic",
    cursor : "not-allowed"
  },

  disabledActive : { backgroundColor : "#eee" },

  info : { color : "gray" },

  label : {
    marginRight : 15,
    flex : 1
  },

  arrow : { fontSize : 9 }
}


class MenuItem extends React.Component {

  constructor(props) {

    super(props)

    this.handleAction = this.handleAction.bind(this)
    this.handleMouseOver = this.handleMouseOver.bind(this)

    this.state = {
      checked : this.props.defaultChecked,
      submenuPosition : { left : 0, top : 0 }
    }

  }

  handleAction(e) {

    e.preventDefault()

    if (this.props.disabled) return

    this.setState({ checked : !this.state.checked })

    if (this.props.action) this.props.action(e, !this.state.checked)

  }

  handleMouseOver(e) {

    if (this.props.onMouseOver) this.props.onMouseOver(e)

  }

  getStyle() {

    const { active, disabled, style, activeColor } = this.props

    let stateStyle = { ...styles.li }

    if (active) {

      if (disabled) stateStyle = { ...stateStyle, ...styles.disabled, ...styles.disabledActive }
      else stateStyle = { ...stateStyle, backgroundColor : activeColor }

    } else if (disabled) stateStyle = { ...stateStyle, ...styles.disabled }

    return { ...stateStyle, ...style }

  }

  createLabel() {

    const { shortcut, label } = this.props

    if (React.isValidElement(label)) {

      return React.cloneElement(label, { style : { ...styles.label, ...label.props.style } })

    } else if (typeof label === "string") {

      if (shortcut) {

        const index = label.toLowerCase().indexOf(shortcut.toLowerCase())

        return (
          <span style={ styles.label }>
            { label.slice(0, index) }
            <u>{ label.slice(index, index + 1) }</u>
            { label.slice(index + 1) }
          </span>
        )

      } else return <span style={ styles.label }>{ label }</span>

    } else return null

  }

  createIcon() {

    const { icon, checkbox } = this.props
    const { checked } = this.state

    if (checkbox) {

      return (
        <span style={ styles.icon }>
          { checked ? "☑" : "☐" }
        </span>
      )

    } else if (typeof icon === "string") {

      return <i className={ icon } style={ styles.icon }/>

    } else if (React.isValidElement(icon)) {

      return React.cloneElement(icon, { style : { ...styles.icon, ...icon.props.style } })

    } else {

      return <span style={ styles.icon }/>

    }

  }

  createInfo() {

    const { info } = this.props

    if (React.isValidElement(info)) {

      return React.cloneElement(info, { style : { ...styles.info, ...info.props.style } })

    } else if (typeof info === "string") {

      return <span style={ styles.info }>{ info }</span>

    } else return null

  }

  createSubmenu(child) {

    const props = {
      display : this.props.submenuDisplay,
      style : { position : "absolute", ...this.state.submenuPosition },
      ref : node => this.submenu = node
    }

    if (!("keyboard" in child.props)) props.keyboard = this.props.keyboard

    return React.cloneElement(child, props)

  }

  hasSubmenu() {

    return React.Children
      .toArray(this.props.children)
      .some(child => child.type && child.type.isReactDesktopMenu)

  }

  componentDidUpdate(prevProps) {

    if (this.props.submenuDisplay && !prevProps.submenuDisplay) {

      this.setSubmenuPosition()

    }

  }

  setSubmenuPosition() {

    const { node } = this
    const dim = node.getBoundingClientRect()
    const subNode = this.submenu.node

    if (!subNode) return

    let left = node.offsetWidth
    let top = node.offsetTop

    if (dim.right + subNode.offsetWidth > window.innerWidth) left = -subNode.offsetWidth

    if (dim.bottom + subNode.offsetHeight > window.innerHeight) {

      top = node.offsetTop + node.offsetHeight - subNode.offsetHeight

    }

    this.setState({ submenuPosition : { left, top } })

  }

  renderChildren() {

    return React.Children.map(this.props.children, child => {

      if (child.type && child.type.isReactDesktopMenu) return this.createSubmenu(child)
      else return child

    })

  }

  render() {

    const { action, ...rest } = this.props

    const submenu = this.hasSubmenu()

    for (const n in this.constructor.propTypes) delete rest[n]

    return (
      <li
        { ...rest }
        style={ this.getStyle() }
        onMouseOver={ this.handleMouseOver }
        onClick={ !submenu && action ? this.handleAction : null }
        ref={ node => this.node = node }
      >
        { this.createIcon() }
        { this.createLabel() }
        { this.renderChildren() }
        { this.createInfo() }
        { submenu ? <span style={ styles.arrow }>▶</span> : "" }
      </li>
    )

  }
}

MenuItem.propTypes = {
  icon : PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  info : PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  label : PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  disabled : PropTypes.bool,
  action : PropTypes.func,
  checkbox : PropTypes.bool,
  defaultChecked : PropTypes.bool,
  shortcut : PropTypes.string,
  activeColor : PropTypes.string,

  style : PropTypes.object,
  children : PropTypes.node,
  onMouseOver : PropTypes.func,
  onMouseOut : PropTypes.func,
  active : PropTypes.bool,
  submenuDisplay : PropTypes.bool,
  keyboard : PropTypes.bool
}

MenuItem.defaultProps = {
  disabled : false,
  submenuDisplay : false,
  activeColor : "#e5ecff"
}

MenuItem.isReactDesktopMenuItem = true

export default MenuItem
