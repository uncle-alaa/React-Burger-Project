import React, { Component } from "react"
import Burger from "../../components/Burger/Burger"
import BuildControls from "../../components/Burger/BuildControls/BuildControls"
import Modal from "../../components/UI/Modal/Modal"
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary"
import axios from "../../axios-orders"
import Spinner from "../../components/UI/Spinner/Spinner"
import withErrorHandler from "../../Hoc/withErrorHandler/withErrorHandler"

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  bacon: 0.7,
  meat: 1.3,
}

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    showOrderSummary: false,
    loading: false,
    error: false,
  }
  componentDidMount() {
    axios
      .get("https://react-my-burger-fc402.firebaseio.com/ingredients.json")
      .then((response) => this.setState({ ingredients: response.data }))
      .catch((error) => this.setState({ error: true }))
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
    // alert("you continue!")
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "alaa",
        adress: {
          street: "no name street",
          zipcode: "42",
          country: "undefined",
        },
      },
    }
    this.setState({ loading: true })
    setTimeout(
      () =>
        axios
          .post("/orders.json", order)
          .then((response) => console.log(response))
          .then((response) =>
            this.setState({ loading: false, showOrderSummary: false })
          )
          .catch((error) => console.log(error))
          .catch((error) =>
            this.setState({ loading: false, showOrderSummary: false })
          ),
      1000
    )
  }

  render() {
    const disabledInfo = { ...this.state.ingredients }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let OrderSummaryOrSpinner = null
    if (this.state.ingredients) {
      OrderSummaryOrSpinner = (
        <OrderSummary
          price={this.state.totalPrice}
          purchaseCancel={this.purchaseCancelHandler}
          purchaseContinue={this.purchaseContinueHandler}
          ingredients={this.state.ingredients}
        />
      )
    }
    if (this.state.loading) {
      OrderSummaryOrSpinner = <Spinner></Spinner>
    }

    let burger = this.state.error ? (
      <h1>An error occured</h1>
    ) : (
      <Spinner></Spinner>
    )
    if (this.state.ingredients) {
      burger = (
        <React.Fragment>
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

    return (
      <React.Fragment>
        <Modal
          show={this.state.showOrderSummary}
          modalClosed={this.purchaseCancelHandler}
        >
          {OrderSummaryOrSpinner}
        </Modal>
        {burger}
      </React.Fragment>
    )
  }
}

export default withErrorHandler(BurgerBuilder, axios)
