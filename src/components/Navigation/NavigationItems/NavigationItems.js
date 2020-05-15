import React from "react"
import classes from "./NavigationItems.module.css"
import NavigationItem from "./NavigationItem/NavigationItem"

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem links="/" active>
      Burger Builder
    </NavigationItem>
    <NavigationItem links="/orders">Orders</NavigationItem>
  </ul>
)

export default navigationItems
