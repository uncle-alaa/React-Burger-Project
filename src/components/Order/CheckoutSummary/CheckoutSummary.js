import React from "react"
import Burger from "../../Burger/Burger"
import classes from "./CheckoutSummary.module.css"
import Button from "../../UI/Button/Button"

const checkoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>we hope it tastes well!</h1>
      <div style={{ width: "300px", height: "300px", margin: "auto" }}>
        <Burger ingredients={props.ingredients}></Burger>
      </div>
      <Button btnType="Danger" clicked={props.checkoutCancelled}>
        Cancel
      </Button>
      <Button btnType="Success" clicked={props.checkoutContinued}>
        Continue
      </Button>
    </div>
  )
}

export default checkoutSummary
