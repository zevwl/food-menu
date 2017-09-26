import { addClass, addId, div, section } from '../builders';
import { $ } from '../helpers';
import { ITEM_ADDED, ITEM_REMOVED, SET_ITEMS } from '../constants';
import leftMenu from './left-menu';
import rightMenu from './right-menu';

export default function menu(store) {
  const menuElement = addId(addClass(div(), 'container'), 'menu');

  store.on(SET_ITEMS, ({items}) => {
    const leftSide = leftMenu(items);
    const rightSide = rightMenu(items);
    const columns = addClass(section(leftSide, rightSide), 'columns');
    $('#menu').children(columns);
  });

  store.on(ITEM_ADDED, ({cart}) => {
    const cartArray = [...cart];
    const articles = cartArray.map(id => `article[data-key='${id}']`);
    const buttons = cartArray.map(id => `article[data-key='${id}'] button.add-to-cart`);

    $(articles.join(', ')).addClass('in-cart');
    $(buttons.join(', ')).attr('disabled', 'disabled');
  });

  store.on(ITEM_REMOVED, ({cart}) => {
    const onPageKeys =  $('article.in-cart').map(element => parseInt(element.dataset.key, 10));
    const inCartKeys = [...cart];
    const keysToRemove = onPageKeys.filter(key => !inCartKeys.includes(key));

    keysToRemove.forEach(key => {
      $(`article[data-key='${key}']`).removeClass('in-cart');
      $(`article[data-key='${key}'] button.add-to-cart`).attr('disabled', false);
    });
  });

  return menuElement;
}
