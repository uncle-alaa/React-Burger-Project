import React from "react"
import classes from "./Order.module.css"

const order = (props) => {
  console.log(props.ingredients)
  let ingredients = Object.keys(props.ingredients).map((element) => (
    <span
      style={{
        textTransform: "capitalize",
        display: "inline-block",
        margin: "0 8px",
        border: "1px solid #ccc",
        padding: " 5px",
      }}
      key={element}
    >
      {element} : ({props.ingredients[element]})
    </span>
  ))
  return (
    <div className={classes.Order}>
      ingredients: {ingredients}
      <p>
        Price: <strong>{Number.parseFloat(props.price).toFixed(2)}</strong>
      </p>
    </div>
  )
}

export default order
