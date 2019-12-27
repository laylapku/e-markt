import { createSelector } from "reselect";

// selector: allows using certain parts of the state
const selectCart = state => state.cart;

// two params: array of input selectors(functions), value to return
export const selectCartItems = createSelector(
  [selectCart],
  cart => cart.cartItems
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  cartItems =>
    cartItems.reduce(
      (accumalatedQuantity, cartItem) =>
        accumalatedQuantity + cartItem.quantity,
      0
    )
);
