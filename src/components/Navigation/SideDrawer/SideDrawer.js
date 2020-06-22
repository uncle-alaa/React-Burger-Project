import React from "react"
import classes from "./SideDrawer.module.css"
import NavigationItems from "../NavigationItems/NavigationItems"
import Logo from "../../Logo/Logo"
import Backdrop from "../../UI/Backrop/Backdrop"

const sideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close]
  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open]
  }

  return (
    <React.Fragment>
      <Backdrop show={props.open} clicked={props.closed}></Backdrop>
      <div className={attachedClasses.join(" ")}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthenticated={props.isAuth}></NavigationItems>
        </nav>
      </div>
    </React.Fragment>
  )
}

export default sideDrawer
