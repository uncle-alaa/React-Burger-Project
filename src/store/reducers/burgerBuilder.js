import * as actionTypes from "../actions/actionTypes"
import { updatedObject, updateObject } from "../utility"

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
}
const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  bacon: 0.7,
  meat: 1.3,
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENTS:
      const updatedIngredient = {
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
      }
      const updatedIngredients = updateObject(
        state.ingredients,
        updatedIngredient
      )
      const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
      }
      return updateObject(state, updatedState)
    case actionTypes.REMOVE_INGREDIENTS:
      const updatedIng = {
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
      }
      const updatedIngs = updateObject(state.ingredients, updatedIng)
      const updatedSt = {
        ingredients: updatedIngs,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
      }
      return updateObject(state, updatedSt)
    case actionTypes.SET_INGREDIENTS:
      return updateObject(state, {
        ingredients: action.ingredients,
        error: false,
        totalPrice: 4,
      })

    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return updateObject(state, { error: true })

    default:
      return state
  }
}

export default reducer
