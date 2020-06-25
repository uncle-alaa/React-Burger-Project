import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import Burger from "../../components/Burger/Burger"
import BuildControls from "../../components/Burger/BuildControls/BuildControls"
import Modal from "../../components/UI/Modal/Modal"
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary"
import axios from "../../axios-orders"
import Spinner from "../../components/UI/Spinner/Spinner"
import withErrorHandler from "../../Hoc/withErrorHandler/withErrorHandler"
import * as actions from "../../store/actions/index"

const BurgerBuilder = (props) => {
  // state = {
  //   ingredients: null,
  //   showOrderSummary: false,
  // }

  const [showOrderSummary, setShowOrderSummary] = useState(false)

  useEffect(() => {
    props.onInitIngredients()
  }, [])
  // componentDidMount() {
  //   this.props.onInitIngredients()
  // }

  const updatePurchaseState = (ingredients) => {
    if (Object.values(ingredients).reduce((a, b) => a + b, 0) > 0) {
      return true
    }
    if (Object.values(ingredients).reduce((a, b) => a + b, 0) === 0) {
      return false
    }
  }

  const showSummary = () => {
    if (props.isAuthenticated) {
      setShowOrderSummary(!showOrderSummary)
    } else {
      props.onSetAuthRedirectPath("/checkout")
      props.history.push("/auth")
    }
  }

  const purchaseCancelHandler = () => {
    setShowOrderSummary(false)
  }

  const purchaseContinueHandler = () => {
    props.onIinitPurchase()
    props.history.push("/checkout")
  }

  const disabledInfo = { ...props.ings }
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0
  }

  let OrderSummaryOrSpinner = null
  if (props.ings) {
    OrderSummaryOrSpinner = (
      <OrderSummary
        price={props.price}
        purchaseCancel={purchaseCancelHandler}
        purchaseContinue={purchaseContinueHandler}
        ingredients={props.ings}
      />
    )
  }

  let burger = props.error ? <h1>An error occured</h1> : <Spinner></Spinner>
  if (props.ings) {
    burger = (
      <React.Fragment>
        <Burger ingredients={props.ings}></Burger>
        <BuildControls
          isAuth={props.isAuthenticated}
          summary={showSummary}
          price={props.price}
          disabledInfo={disabledInfo}
          ingredients={props.ings}
          ingredientAdded={props.onIngredientAdded}
          ingredientRemoved={props.onIngredientRemoved}
          purchasable={updatePurchaseState(props.ings)}
        ></BuildControls>
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <Modal show={showOrderSummary} modalClosed={purchaseCancelHandler}>
        {OrderSummaryOrSpinner}
      </Modal>
      {burger}
    </React.Fragment>
  )
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
