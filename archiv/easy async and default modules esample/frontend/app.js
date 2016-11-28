'use strict';
import $ from 'jquery';

$('.hi-async').click(() => {
  require.ensure(['./login'], () => {
    let login = require('./login');
    login();
  })
});
