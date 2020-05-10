import React, { Component } from "react"
import Burger from "../../components/Burger/Burger"
import BuildControls from "../../components/Burger/BuildControls/BuildControls"
import Modal from "../../components/UI/Modal/Modal"
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary"

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  bacon: 0.7,
  meat: 1.3,
}

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
    purchasable: false,
    showOrderSummary: false,
  }

  addIngredientHandler = (type) => {
    let ingredients = { ...this.state.ingredients }
    ingredients[type]++

    const price = INGREDIENT_PRICES[type]
    const oldPrice = this.state.totalPrice
    const totalPrice = price + oldPrice

    this.setState({ totalPrice, ingredients })
    this.updatePurchaseState(ingredients)
  }
  removeIngredientHandler = (type) => {
    let ingredients = { ...this.state.ingredients }
    if (ingredients[type] > 0) {
      ingredients[type]--

      const price = INGREDIENT_PRICES[type]
      const oldPrice = this.state.totalPrice
      const newPrice = -price + oldPrice

      this.setState({ totalPrice: newPrice, ingredients })
      this.updatePurchaseState(ingredients)
    }
  }

  updatePurchaseState(ingredients) {
    if (Object.values(ingredients).reduce((a, b) => a + b, 0) > 0) {
      this.setState({ purchasable: true })
    }
    if (Object.values(ingredients).reduce((a, b) => a + b, 0) === 0) {
      this.setState({ purchasable: false })
    }
  }

  _
  showSummary = () => {
    this.setState({ showOrderSummary: !this.state.showOrderSummary })
  }

  purchaseCancelHandler = () => {
    this.setState({ showOrderSummary: false })
  }

  purchaseContinueHandler = () => {
    alert("you continue!")
  }

  render() {
    const disabledInfo = { ...this.state.ingredients }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    return (
      <React.Fragment>
        <Modal
          show={this.state.showOrderSummary}
          modalCloded={this.purchaseCancelHandler}
        >
          <OrderSummary
            price={this.state.totalPrice}
            purchaseCancel={this.purchaseCancelHandler}
            purchaseContinue={this.purchaseContinueHandler}
            ingredients={this.state.ingredients}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients}></Burger>
        <BuildControls
          summary={this.showSummary}
          price={this.state.totalPrice}
          disabledInfo={disabledInfo}
          ingredients={this.state.ingredients}
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          purchasable={this.state.purchasable}
        ></BuildControls>
      </React.Fragment>
    )
  }
}

export default BurgerBuilder
