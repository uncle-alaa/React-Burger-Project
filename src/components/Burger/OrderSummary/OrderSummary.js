import React, { Component } from "react"
import Button from "../../UI/Button/Button"

class OrderSummary extends Component {
  //WARNING! To be deprecated in React v17. Use componentDidUpdate instead.

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(
      (igKey) => {
        return (
          <li key={igKey}>
            <span style={{ textTransform: "capitalize" }}>{igKey}</span> :
            {this.props.ingredients[igKey]}
          </li>
        )
      }
    )
    return (
      <React.Fragment>
        <h3>Yout Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>Total Price :{this.props.price.toFixed(2)}</strong>
        </p>
        <p>Continue to checkout</p>
        <Button btnType={"Danger"} clicked={this.props.purchaseCancel}>
          CANCEL
        </Button>
        <Button btnType={"Success"} clicked={this.props.purchaseContinue}>
          CONTINUE
        </Button>
      </React.Fragment>
    )
  }
}
export default OrderSummary
