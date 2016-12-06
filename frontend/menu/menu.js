'use strict';

import './PTSansItalic.eot';
import './PTSansItalic.ttf';
import './PTSansItalic.woff';
import './menu.sass';

import template from './menu.jade';

export  default class Menu {
  constructor(options) {
    this.elem = $('<div>', {
      class: 'my-class'
    }).append(template(options));
  }
}