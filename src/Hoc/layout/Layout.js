import React, { Component } from "react"
import Toolbar from "../../components/Navigation/Toolbar/Toolbar"
import classes from "./Layout.module.css"
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"

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
  logoClickHandler = () => {
    this.props.history.replace("/")
  }
  render() {
    console.log(this.props.isAuthenticated)
    return (
      <React.Fragment>
        <Toolbar
          isAuth={this.props.isAuthenticated}
          click={this.sideDrawerOpenHandler}
          logoClick={this.logoClickHandler}
        ></Toolbar>
        <SideDrawer
          isAuth={this.props.isAuthenticated}
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
        ></SideDrawer>
        <main className={classes.Content}>{this.props.children}</main>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  }
}

export default connect(mapStateToProps)(withRouter(Layout))
