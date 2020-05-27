import React, { Component } from "react"
import { connect } from "react-redux"
import Burger from "../../components/Burger/Burger"
import BuildControls from "../../components/Burger/BuildControls/BuildControls"
import Modal from "../../components/UI/Modal/Modal"
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary"
import axios from "../../axios-orders"
import Spinner from "../../components/UI/Spinner/Spinner"
import withErrorHandler from "../../Hoc/withErrorHandler/withErrorHandler"
import * as actionTypes from "../../store/actions"

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    showOrderSummary: false,
    loading: false,
    error: false,
  }
  componentDidMount() {
    // axios
    //   .get("https://react-my-burger-fc402.firebaseio.com/ingredients.json")
    //   .then((response) => this.setState({ ingredients: response.data }))
    //   .catch((error) => this.setState({ error: true }))
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
    this.setState({ showOrderSummary: !this.state.showOrderSummary })
  }

  purchaseCancelHandler = () => {
    this.setState({ showOrderSummary: false })
  }

  purchaseContinueHandler = () => {
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
    if (this.state.loading) {
      OrderSummaryOrSpinner = <Spinner></Spinner>
    }

    let burger = this.state.error ? (
      <h1>An error occured</h1>
    ) : (
      <Spinner></Spinner>
    )
    if (this.props.ings) {
      burger = (
        <React.Fragment>
          <Burger ingredients={this.props.ings}></Burger>
          <BuildControls
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
    ings: state.ingredients,
    price: state.totalPrice,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) =>
      dispatch({ type: actionTypes.ADD_INGREDIENTS, ingredientName: ingName }),
    onIngredientRemoved: (ingName) =>
      dispatch({
        type: actionTypes.REMOVE_INGREDIENTS,
        ingredientName: ingName,
      }),
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios))
