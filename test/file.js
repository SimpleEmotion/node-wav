'use strict';

var Wav = require( '../' );
var path = require( 'path' );

describe( 'File', function () {

  describe( '#hash()', function () {

    it( 'should throw an error for nonexistent file', function ( done ) {

      var filename = path.resolve( __dirname, './audio/nonexistent-file.wav' );

      Wav.file.hash( filename, function ( err ) {

        if ( err ) {
          return done();
        }

        done( new Error( 'Expected error.' ) );

      } );

    } );

    it( 'should throw an error for invalid wav file', function ( done ) {

      var filename = path.resolve( __dirname, './file.js' );

      Wav.file.hash( filename, function ( err ) {

        if ( err ) {
          return done();
        }

        done( new Error( 'Expected error.' ) );

      } );

    } );

    it( 'should calculate correct hash for file T2a6uvl5c4m7ozqnt37wejkt32a.wav', function ( done ) {

      var filename = path.resolve( __dirname, './audio/T2a6uvl5c4m7ozqnt37wejkt32a.wav' );
      var expected = 'AC7A05D0EE017731F5BDA0CAA45A8A553AE3A8CA828694932C9EB2A49BD4ADC3';

      Wav.file.hash( filename, function ( err, hash ) {

        if ( err ) {
          return done( err );
        }

        // Ensure hash is correct
        if ( hash.toLowerCase() === expected.toLowerCase() ) {
          done();
        } else {
          done( new Error( 'Expected and actual values do not match.' ) );
        }

      } );

    } );

    it( 'should calculate correct hash for file T2aaoxo63yfkykfmdr7yehuzqza.wav', function ( done ) {

      var filename = path.resolve( __dirname, './audio/T2aaoxo63yfkykfmdr7yehuzqza.wav' );
      var expected = '118DA6568EE44D31A7335185563866A447C6B3CC76FFAB181CC00E4EF4BD5AC0';

      Wav.file.hash( filename, function ( err, hash ) {

        if ( err ) {
          return done( err );
        }

        // Ensure hash is correct
        if ( hash.toLowerCase() === expected.toLowerCase() ) {
          done();
        } else {
          done( new Error( 'Expected and actual values do not match.' ) );
        }

      } );

    } );

  } );

} );
