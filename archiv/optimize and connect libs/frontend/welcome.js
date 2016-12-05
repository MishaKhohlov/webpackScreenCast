'use strict';

export default function(message) {

  console.log(LANG);

  if(NODE_ENV) {
    console.log(`Welcome ${message}`);
  }

};