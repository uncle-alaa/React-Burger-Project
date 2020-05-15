import React, { Component } from "react"
import Button from "../../../components/UI/Button/Button"
import classes from "./ContactData.module.css"
import axios from "../../../axios-orders"
import Spinner from "../../../components/UI/Spinner/Spinner"

class ContactData extends Component {
  state = {
    ingredients: {},
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: "",
    },
    loading: false,
  }

  orderHandler = (event) => {
    event.preventDefault()
    console.log(this.props.ingredients)
    this.setState({ loading: true })
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "alaa",
        adress: {
          street: "no name street",
          zipcode: "42",
          country: "undefined",
        },
      },
    }
    setTimeout(
      () =>
        axios
          .post("/orders.json", order)
          .then((response) => console.log(response))
          .then((response) => {
            this.setState({ loading: false })
            this.props.history.push("/")
          })
          .catch((error) => console.log(error))
          .catch((error) => this.setState({ loading: false })),
      2000
    )
  }

  render() {
    let form = (
      <form>
        <input
          className={classes.Input}
          type="text"
          name="name"
          placeholder="Your name"
        ></input>
        <input
          className={classes.Input}
          type="email"
          name="email"
          placeholder="Your Mail"
        ></input>
        <input
          className={classes.Input}
          type="text"
          name="street"
          placeholder="Street"
        ></input>
        <input
          className={classes.Input}
          type="text"
          name="postal"
          placeholder="Postal Code"
        ></input>
        <Button
          clicked={this.orderHandler}
          className={classes.Input}
          btnType="Success"
        >
          ORDER
        </Button>
      </form>
    )
    if (this.state.loading) {
      form = <Spinner></Spinner>
    }
    console.log(this.props)
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    )
  }
}

export default ContactData
