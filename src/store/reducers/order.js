import * as actionTypes from "../actions/actionTypes"
import { updateObject } from "../utility"
import { purchaseBurgerStart, fetchOrdersStart } from "../actions/order"

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
}

const purchaseBurgerStart = (state, action) => {
  return updateObject(state, { loading: true })
}
const purchaseBurgerSucess = (state, action) => {
  const newOrder = updateObject(action.orderData, { id: action.orderId })
  return updateObject(state, {
    loading: false,
    purchased: true,
    orders: state.orders.concat(newOrder),
  })
}
const purchaseBurgerFail = (state, action) => {
  return updateObject(state, { loading: false })
}
const purchaseInit = (state, action) => {
  return updateObject(state, { purchased: false })
}
const fetchOrdersStart = (state, action) => {
  return updateObject(state, { loading: true })
}
const fetchOrderSuccess = (state, action) => {
  return updateObject(state, { loading: false, orders: action.orders })
}
const fetchOrderFail = (state, action) => {
  return updateObject(state, { loading: false })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_START:
      return purchaseBurgerStart(state, action)
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSucess(state, action)
    case actionTypes.PURCHASE_BURGER_FAIL:
      return purchaseBurgerFail(state, action)
    case actionTypes.PURCHASE_INIT:
      return purchaseInit(state, action)
    case actionTypes.FETCH_ORDERS_START:
      return fetchOrdersStart(state, action)
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return fetchOrderSuccess(state, action)
    case actionTypes.FETCH_ORDERS_FAIL:
      return fetchOrderFail(state, action)
    default:
      return state
  }
}

export default reducer