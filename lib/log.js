'use strict';

var util = require( 'util' );

module.exports = log;

function log( m ) {
  if ( process.env.verbose ) {
    util.log( '[node-wav] ' + m );
  }
}
