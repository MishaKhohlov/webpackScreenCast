'use strict';
import Menu from './menu/menu.js';

let pandaMenu = new Menu({
  title: 'Menu Panda!',
  items: [
    {text: 'Eggs', href: '#eggs'},
    {text: 'Meat', href: '#meat'},
    {text: 'Bamboo', href: '#bamboo'}
  ]
});

$('body').append(pandaMenu.elem);