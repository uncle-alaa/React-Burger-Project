import React from "react"
import classes from "./Modal.module.css"
import Aux from "../../../hoc/Aux"
import Backdrop from "../Backrop/Backdrop"

const modal = (props) => (
  <Aux>
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
  </Aux>
)

export default modal
