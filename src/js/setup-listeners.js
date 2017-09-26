import { $ } from './helpers';
import { ITEM_ADDED, ITEM_REMOVED, TOGGLE_SHOW_CART } from './constants';

function getParentWithKey(element) {
  let parent = element.parentElement;

  while(parent && !parent.dataset.key) {
    parent = parent.parentElement;
  }

  return parent;
}

export default function (store) {
  $('#cart-icon, #close').on('click', () => store.trigger(TOGGLE_SHOW_CART));

  $('.add-to-cart').on('click', event => {
    const parent = getParentWithKey(event.currentTarget);
    const key = parseInt(parent.dataset.key, 10);
    store.trigger(ITEM_ADDED, {item: key});
  });

  $('body').on('click', event => {
    if (event.target.classList.contains('remove')) {
      const element = event.target;
      const parent = getParentWithKey(element);
      const key = parseInt(parent.dataset.key, 10);

      parent.parentElement.removeChild(parent);
      store.trigger(ITEM_REMOVED, {item: key});
    }
  });
}
