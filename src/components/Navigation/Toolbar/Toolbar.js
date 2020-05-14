import React from "react"
import classes from "./Toolbar.module.css"
import Logo from "../../Logo/Logo"
import NavigationItems from "../Toolbar/NavigationItems/NavigationItems"
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle"

const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <DrawerToggle click={props.click} />
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems></NavigationItems>
    </nav>
  </header>
)

export default toolbar
