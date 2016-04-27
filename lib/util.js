'use strict';

module.exports = {
  min: min,
  max: max,
  abs: abs,
  add: add,
  multiply: multiply,
  normMaxAbs: normMaxAbs
};

/**
 * Determines and returns minimum value in Array `A`.
 *
 * @param {Array<number>} A - array of numbers used to determine minimum value
 * @return {number} - minimum value in Array `A`
 */
function min( A ) {

  var O = A[ 0 ];

  for ( var i = 1, n = A.length; i < n; ++i ) {
    if ( O > A[ i ] ) {
      O = A[ i ];
    }
  }

  return O;

}

/**
 * Determines and returns maximum value in Array `A`.
 *
 * @param {Array<number>} A - array of numbers used to determine maximum value
 * @return {number} - maximum value in Array `A`
 */
function max( A ) {

  var O = A[ 0 ];

  for ( var i = 1, n = A.length; i < n; ++i ) {
    if ( O < A[ i ] ) {
      O = A[ i ];
    }
  }

  return O;

}

/**
 * Generates and returns new array of elements being the absolute value of elements in Array `A`.
 *
 * @param {Array<number>} A - array of numbers used to generate new array of absolute values
 * @return {Array<number>} - new array of elements being the absolute value of elements in Array `A`
 */
function abs( A ) {

  var O = new Array( A.length );

  for ( var i = 0, n = A.length; i < n; ++i ) {
    O[ i ] = Math.abs( A[ i ] );
  }

  return O;

}

/**
 * @param {Array<number>} A -
 * @param {number|Array<number>} B -
 * @return {Array<number>} -
 */
function add( A, B ) {

  var i = 0;
  var n = A.length;
  var O = new Array( A.length );

  if ( B.constructor === Array ) {

    for ( ; i < n; ++i ) {
      O[ i ] = A[ i ] + B[ i ];
    }

  } else if ( typeof B === 'number' ) {

    for ( ; i < n; ++i ) {
      O[ i ] = A[ i ] + B;
    }

  } else {
    throw new Error( 'Invalid argument type for parameter B. Must be Array or number.' );
  }

  return O;

}

/**
 * @param {Array<number>} A -
 * @param {number|Array<number>} B -
 * @return {Array<number>} -
 */
function multiply( A, B ) {

  var i = 0;
  var n = A.length;
  var O = new Array( A.length );

  if ( B.constructor === Array ) {

    for ( ; i < n; ++i ) {
      O[ i ] = A[ i ] * B[ i ];
    }

  } else if ( typeof B === 'number' ) {

    for ( ; i < n; ++i ) {
      O[ i ] = A[ i ] * B;
    }

  } else {
    throw new Error( 'Invalid argument type for parameter B. Must be Array or number.' );
  }

  return O;

}

/**
 * @param {Array<number>} A -
 * @return {Array<number>} -
 */
function normMaxAbs( A ) {
  var norm = max( abs( A ) );
  return multiply( A, 1.0 / norm );
}
