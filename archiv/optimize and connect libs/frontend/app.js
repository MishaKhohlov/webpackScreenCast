'use strict';

/*
 let route = require('./folder/' + 'namefiles' + '.js');
 */

document.getElementById('hi-async-login').onclick = () => {
  require.ensure(['./login'], () => {
    let login = require('./login');
    login();
  }, 'auth')
};


document.getElementById('hi-async-logout').onclick = () => {
  require.ensure(['./login'], () => {
    let logout = require('./logout');
    logout();
  }, 'auth')
};
