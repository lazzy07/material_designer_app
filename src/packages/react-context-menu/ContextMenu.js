import React, { Component } from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import { CLOSE_MENU, OPEN_MENU } from "../connection-plugin-0.9.0/windowevents";

class ContextMenu extends Component {
  dispatchCloseMenu = false;
  constructor(props) {

    super(props)

    this.state = { display : false, position : { x : 0, y : 0 } }

    this.handleBlurWindow = this.handleBlurWindow.bind(this)
    this.handleClickDoc = this.handleClickDoc.bind(this)
    this.handleContextMenu = this.handleContextMenu.bind(this)

    this.menu = React.createRef()
  }

  close() { 
    this.setState({ display : false });

    if(this.dispatchCloseMenu){
      const event = new CustomEvent(CLOSE_MENU);
      window.dispatchEvent(event);
      this.dispatchCloseMenu = false;
    }
  }

  handleBlurWindow() { 
    this.close();
  }

  handleClickDoc(e) {

    if (!this.menu.current) return

    const { current } = this.menu

    if (current && !current.contains(e.target)) this.close()
  }

  handleContextMenu(e) {

    e.preventDefault()
    e.persist()

    this.setState({ display : true }, () => this.setPosition(e))

    if (this.props.onContextMenu) this.props.onContextMenu(e)
  }

  setPosition(e) {

    if (!this.menu) return

    const { current } = this.menu

    if (!current) return

    let x = e.clientX
    let y = e.clientY

    if (e.clientX + current.offsetWidth > window.innerWidth) {

      x -= current.offsetWidth
      if (x < 0) x = window.innerWidth - current.offsetWidth

    }

    if (e.clientY + current.offsetHeight > window.innerHeight) {

      y -= current.offsetHeight
      if (y < 0) y = window.innerHeight - current.offsetHeight

    }

    this.setState({ position : { x, y } })

  }

  handleOpenMenu = (e) => {
    this.addEventListeners();
    this.dispatchCloseMenu = true;
    this.setState({display: true}, () => this.setPosition(e.detail.event));
  }

  addEventListeners() {
    document.addEventListener("mousedown", this.handleClickDoc)
    window.addEventListener("blur", this.handleBlurWindow)
  }
  
  removeEventListeners() {
    document.removeEventListener("mousedown", this.handleClickDoc)
    window.removeEventListener("blur", this.handleBlurWindow)
  }
  
  componentDidUpdate(_, prevState) {
    if (this.state.display && !prevState.display) {
      this.addEventListeners()
    } else if (!this.state.display && prevState.display) {
      this.removeEventListeners()
    }
  }
  
  componentDidMount = () => {
    window.addEventListener(OPEN_MENU, this.handleOpenMenu)
  };
  

  componentWillUnmount() {
    this.removeEventListeners()
    window.removeEventListener(OPEN_MENU, this.handleOpenMenu)
  }

  handlePreventDefault(e) { e.preventDefault() }

  render() {

    const { children, menu, ...rest } = this.props

    const content = React.Children.only(children)

    const container = React.cloneElement(content, {
      key : "container",
      ...rest,
      onContextMenu : this.handleContextMenu
    })

    if (this.state.display) {

      const contextMenu = ReactDOM.createPortal((
        <div
          key="contextMenu"
          ref={ this.menu }
          onContextMenu={ this.handlePreventDefault }
          style={ {
            position : "fixed",
            left : this.state.position.x,
            top : this.state.position.y
          } }
        >
          { menu }
        </div>
      ), document.body)

      return [container, contextMenu]

    } else return container

  }

}

ContextMenu.propTypes = {
  children : PropTypes.node,
  menu : PropTypes.node,
  onContextMenu : PropTypes.func
}

export default ContextMenu
