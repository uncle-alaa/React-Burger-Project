import React, { Component } from "react"
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary"
import { Route, Redirect } from "react-router-dom"
import ContactData from "./ContactData/ContactData"
import { connect } from "react-redux"
import * as actions from "../../store/actions/index"
const Checkout = (props) => {
  const checkoutCancelledHandler = () => {
    props.history.goBack()
  }
  const checkoutContinuedHandler = () => {
    props.history.replace("./checkout/contact-data")
  }
  console.log(props)
  let summary = <Redirect to="/" />
  if (props.ings) {
    const purchasedRedirect = props.purchased ? <Redirect to="/" /> : null
    summary = (
      <div>
        {purchasedRedirect}
        <CheckoutSummary
          checkoutCancelled={checkoutCancelledHandler}
          checkoutContinued={checkoutContinuedHandler}
          ingredients={props.ings}
        ></CheckoutSummary>
        <Route
          path={props.match.url + "/contact-data"}
          component={ContactData}
        ></Route>
      </div>
    )
  }
  return summary
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
  }
}

export default connect(mapStateToProps)(Checkout)
