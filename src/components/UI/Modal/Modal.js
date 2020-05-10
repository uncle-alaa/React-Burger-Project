import React from "react"
import classes from "./Modal.module.css"
import Backdrop from "../Backrop/Backdrop"

const modal = (props) => (
  <React.Fragment>
    <Backdrop clicked={props.modalCloded} show={props.show}></Backdrop>
    <div
      className={classes.Modal}
      style={{
        transform: props.show ? "translateY(0)" : "translateY(-100vh)",
        opacity: props.show ? "1" : "0",
      }}
    >
      {props.children}
    </div>
  </React.Fragment>
)

export default modal
