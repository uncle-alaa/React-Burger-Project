import React, { useState } from "react"
import Toolbar from "../../components/Navigation/Toolbar/Toolbar"
import classes from "./Layout.module.css"
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"

const Layout = (props) => {
  const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false)

  const sideDrawerClosedHandler = () => {
    setSideDrawerIsVisible(false)
  }
  const sideDrawerOpenHandler = () => {
    setSideDrawerIsVisible(!sideDrawerIsVisible)
  }
  const logoClickHandler = () => {
    props.history.replace("/")
  }

  return (
    <React.Fragment>
      <Toolbar
        isAuth={props.isAuthenticated}
        click={sideDrawerOpenHandler}
        logoClick={logoClickHandler}
      ></Toolbar>
      <SideDrawer
        isAuth={props.isAuthenticated}
        open={sideDrawerIsVisible}
        closed={sideDrawerClosedHandler}
      ></SideDrawer>
      <main className={classes.Content}>{props.children}</main>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  }
}

export default connect(mapStateToProps)(withRouter(Layout))
