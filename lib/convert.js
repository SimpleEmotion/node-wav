'use strict';

var log = require( './log' );
var fs = require( 'fs' );
var path = require( 'path' );
var spawn = require( 'child_process' ).spawn;
var StreamSplitter = require( 'stream-splitter' );

module.exports = {
  file: convert,
  dir: dir
};

/**
 * @callback convertCallback
 * @param {Error} err - Error object
 */

/**
 * Converts `input` audio file to standardized wav file `output`, possibly overwriting existing file, using FFmpeg.
 *
 * @param {string} input - filename of input file
 * @param {string} output - filename of output file
 * @param {Object} options - options
 * @param {Array<number>} [options.channels] - list of zero-indexed channel numbers that should be converted
 * @param {boolean} [options.mix=false] - true if multiple audio channels should be mixed into a single audio channel
 * @param {number} [options.sampleRate=8000] - sample rate
 * @param {convertCallback} done - callback
 * @return {undefined}
 */
function convert( input, output, options, done ) {

  options = options || {};

  var params = [];

  params.push( '-loglevel', 'error' ); // only output errors
  params.push( '-i', input );          // input file

  if ( options.channels ) {

    if ( options.channels.constructor !== Array ) {
      return done( new Error( 'Invalid option: channels. Must be an array.' ) );
    }

    options.channels.forEach( function ( c ) {
      params.push( '-map_channel', '0.0.' + parseInt( c, 10 ) );
    } );

  }

  if ( options.mix ) {
    params.push( '-ac', 1 ); // mix into single channel
  }

  params.push( '-ar', options.sampleRate || 8000 ); // standard sampling rate
  params.push( '-y', output );                      // overwrite output

  var child = spawn( 'ffmpeg', params );

  var stdout = child.stdout.pipe( StreamSplitter( '\n' ) );

  stdout.on( 'token', function ( data ) {
    log( data.toString() );
  } );

  stdout.on( 'err', function ( err ) {
    log( err.toString() );
    done( err );
  } );

  stdout.on( 'done', function () {

    // Check to see if the conversion succeeded (i.e. output file exists)
    fs.exists( output, function ( exists ) {

      if ( !exists ) {
        return done( new Error( 'Conversion failed.' ) );
      }

      done( null );

    } );

  } );

  child.stderr.on( 'data', function ( data ) {
    log( data.toString() );
  } );

}

/**
 * @callback convertDirCallback
 * @param {Error} err - Error object
 */

/**
 * Converts all files in directory `origin` into wav files and puts them into directory `destination`, possibly
 * overwriting existing files.
 *
 * Error handling: fail-fast.
 *
 * @param {string} origin - directory that contains files to convert
 * @param {string} destination - directory to put converted files
 * @param {convertDirCallback} done - callback
 */
function dir( origin, destination, done ) {
  fs.readdir( origin, function ( err, files ) {

    if ( err ) {
      return done( err );
    }

    ( function next( i, n ) {

      if ( i >= n ) {
        return done( null );
      }

      var filename = path.resolve( path.join( origin, files[ i ] ) );

      // Get file stats to check if it is a file
      fs.stat( filename, function ( err, stats ) {

        if ( err ) {
          return done( err );
        }

        if ( !stats.isFile() ) {
          return next( i + 1, n );
        }

        // We're dealing with a proper file; determine output filename
        var basename = path.basename( files[ i ], '.wav' );
        var newFilename = path.resolve( path.join( destination, basename + '.wav' ) );

        // Convert file
        convert( filename, newFilename, { mix: true }, function ( err ) {

          if ( err ) {
            return done( err );
          }

          next( i + 1, n );

        } );

      } );

    } )( 0, files.length );

  } );
}
