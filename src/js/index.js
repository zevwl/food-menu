import app from './components/app';
import { createStore } from './state';
import setupListeners from './setup-listeners';
import { ITEM_ADDED, ITEM_REMOVED, SET_ITEMS, TOGGLE_SHOW_CART } from './constants';

function reducer(state, event, data) {
  switch (event) {
    case SET_ITEMS:
      return Object.assign({}, state, {items: data.items.reduce((total, item) => Object.assign({}, total, {[item.id]: item}), {})});
    case TOGGLE_SHOW_CART:
      return Object.assign({}, state, {cartVisible: !state.cartVisible});
    case ITEM_ADDED:
      return Object.assign({}, state, {cart: (new Set(state.cart)).add(data.item)});
    case ITEM_REMOVED:
      const newCart = (new Set(state.cart));
      newCart.delete(data.item);
      return Object.assign({}, state, {cart: newCart});
    default:
      return state;
  }
}

const store = createStore(reducer);

fetch('food.json')
  .then(res => res.json())
  .then(resBody => {
    const body = document.querySelector('body');
    body.insertBefore(app(store), body.childNodes[0]);
    store.trigger(SET_ITEMS, { items: resBody });
    setupListeners(store);
  });
