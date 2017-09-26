import { div, addId } from '../builders';
import modal from './modal';
import navbar from './navbar';
import hero from './hero';
import menu from './menu';
import bottom from './bottom';

export default function app(store) {
  const modalElement = modal(store);
  const navbarElement = navbar();
  const heroElement = hero();
  const menuElement = menu(store);
  const footerElement = bottom();

  return addId(div(modalElement, navbarElement, heroElement, menuElement, footerElement), 'app-container');
}
