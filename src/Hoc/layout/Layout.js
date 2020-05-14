import React, { Component } from "react"
import Toolbar from "../../components/Navigation/Toolbar/Toolbar"
import classes from "./Layout.module.css"
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer"

class Layout extends Component {
  state = {
    showSideDrawer: false,
  }
  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false })
  }
  sideDrawerOpenHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer }
    })
  }
  render() {
    return (
      <React.Fragment>
        <Toolbar click={this.sideDrawerOpenHandler}></Toolbar>
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
        ></SideDrawer>
        <main className={classes.Content}>{this.props.children}</main>
      </React.Fragment>
    )
  }
}

export default Layout