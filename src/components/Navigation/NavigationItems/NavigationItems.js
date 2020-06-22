import React from "react"
import classes from "./NavigationItems.module.css"
import NavigationItem from "./NavigationItem/NavigationItem"

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem links="/" active>
      Burger Builder
    </NavigationItem>
    {props.isAuthenticated ? (
      <NavigationItem links="/orders">Orders</NavigationItem>
    ) : null}
    {!props.isAuthenticated ? (
      <NavigationItem links="/auth">Authenticate</NavigationItem>
    ) : (
      <NavigationItem links="/logout">Logout</NavigationItem>
    )}
  </ul>
)

export default navigationItems
