import React from "react"
import classes from "./Logo.module.css"
import burgerLogo from "../../assets/images/burger-logo.png"

const logo = (props) => (
  <div className={classes.Logo}>
    <img onClick={props.click} src={burgerLogo} alt="myBurger" />
  </div>
)

export default logo
