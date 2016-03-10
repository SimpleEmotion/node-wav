'use strict';

var util = require( 'util' );

module.exports = log;

function log( m ) {
  util.log( '[node-wav] ' + m );
}
