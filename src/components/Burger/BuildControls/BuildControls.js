import React from "react"
import BuildControl from "./BuildControl/BuildControl"
import classes from "./BuildControls.module.css"

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
]

const buildControls = (props) => (
  <div className={classes.BuildControls}>
    <p>
      Current price : <strong>{props.price.toFixed(2)}</strong>{" "}
    </p>
    {controls.map((element) => (
      <BuildControl
        disabledInfo={props.disabledInfo[element.type]}
        type={element.type}
        key={element.label}
        label={element.label}
        added={() => props.ingredientAdded(element.type)}
        removed={() => props.ingredientRemoved(element.type)}
      />
    ))}

    <button
      onClick={props.summary}
      className={classes.OrderButton}
      disabled={!props.purchasable}
    >
      {props.isAuth ? "ORDER NOW" : "SIGN UP TO ORDER"}
    </button>
  </div>
)

export default buildControls
