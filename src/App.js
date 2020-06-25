import React, { useEffect } from "react"
import Layout from "./Hoc/layout/Layout"
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder"
import Checkout from "./containers/Checkout/Checkout"
import { Route, Switch, withRouter, Redirect } from "react-router-dom"
import Orders from "./containers/Orders/Orders"
import Auth from "./containers/Auth/Auth"
import Logout from "./containers/Auth/logout/logout"
import { connect } from "react-redux"
import * as actions from "./store/actions/index"

const App = (props) => {
  useEffect(() => {
    props.onTryAutoSignup()
  }, [])

  let routes = (
    <Switch>
      <Route path="/" exact component={BurgerBuilder} />

      <Route path="/auth" component={Auth} />
      <Redirect to="/"></Redirect>
    </Switch>
  )
  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/orders" component={Orders} />
        <Route path="/logout" component={Logout} />
        <Route path="/auth" component={Auth} />
        <Route path="/checkout" component={Checkout} />
        <Redirect to="/"></Redirect>
      </Switch>
    )
  }
  return (
    <div>
      <Layout>{routes}</Layout>
    </div>
  )
}
const mapStatetoProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  }
}
export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(App))
