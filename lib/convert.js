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
 * @param {convertCallback} done - callback
 */
function convert( input, output, done ) {

  var options = [
    '-loglevel', 'error', // only output errors
    '-i', input,          // input file
    '-ar', 8000,          // standard sampling rate
    '-y', output          // overwrite output
  ];

  var child = spawn( 'ffmpeg', options );

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
      if ( exists ) {
        done( null );
      } else {
        done( new Error( 'Conversion failed.' ) );
      }
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
      if ( i < n ) {

        var filename = path.resolve( path.join( origin, files[ i ] ) );

        // Get file stats to check if it is a file
        fs.stat( filename, function ( err, stats ) {

          if ( err ) {
            return done( err );
          }

          if ( stats.isFile() ) {

            // We're dealing with a proper file; determine output filename
            var basename = path.basename( files[ i ], '.wav' );
            var newFilename = path.resolve( path.join( destination, basename + '.wav' ) );

            // Convert file
            convert( filename, newFilename, function ( err ) {

              if ( err ) {
                return done( err );
              }

              next( i + 1, n );

            } );

          } else {
            next( i + 1, n );
          }

        } );

      } else {
        done( null );
      }
    } )( 0, files.length );

  } );
}
