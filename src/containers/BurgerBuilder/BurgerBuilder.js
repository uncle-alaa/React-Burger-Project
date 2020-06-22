import React, { Component } from "react"
import { connect } from "react-redux"
import Burger from "../../components/Burger/Burger"
import BuildControls from "../../components/Burger/BuildControls/BuildControls"
import Modal from "../../components/UI/Modal/Modal"
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary"
import axios from "../../axios-orders"
import Spinner from "../../components/UI/Spinner/Spinner"
import withErrorHandler from "../../Hoc/withErrorHandler/withErrorHandler"
import * as actions from "../../store/actions/index"

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    showOrderSummary: false,
  }
  componentDidMount() {
    this.props.onInitIngredients()
  }

  updatePurchaseState(ingredients) {
    if (Object.values(ingredients).reduce((a, b) => a + b, 0) > 0) {
      return true
    }
    if (Object.values(ingredients).reduce((a, b) => a + b, 0) === 0) {
      return false
    }
  }

  _
  showSummary = () => {
    if (this.props.isAuthenticated) {
      this.setState({ showOrderSummary: !this.state.showOrderSummary })
    } else {
      this.props.onSetAuthRedirectPath("/checkout")
      this.props.history.push("/auth")
    }
  }

  purchaseCancelHandler = () => {
    this.setState({ showOrderSummary: false })
  }

  purchaseContinueHandler = () => {
    this.props.onIinitPurchase()
    this.props.history.push("/checkout")
  }

  render() {
    const disabledInfo = { ...this.state.ings }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let OrderSummaryOrSpinner = null
    if (this.props.ings) {
      OrderSummaryOrSpinner = (
        <OrderSummary
          price={this.props.price}
          purchaseCancel={this.purchaseCancelHandler}
          purchaseContinue={this.purchaseContinueHandler}
          ingredients={this.props.ings}
        />
      )
    }

    let burger = this.props.error ? (
      <h1>An error occured</h1>
    ) : (
      <Spinner></Spinner>
    )
    if (this.props.ings) {
      burger = (
        <React.Fragment>
          <Burger ingredients={this.props.ings}></Burger>
          <BuildControls
            isAuth={this.props.isAuthenticated}
            summary={this.showSummary}
            price={this.props.price}
            disabledInfo={disabledInfo}
            ingredients={this.props.ings}
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            purchasable={this.updatePurchaseState(this.props.ings)}
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

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) =>
      dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),

    onIinitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) =>
      dispatch(actions.setAuthRedirectPath(path)),
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios))
