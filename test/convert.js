'use strict';

var Wav = require( '..' );
var fs = require( 'fs' );
var path = require( 'path' );

describe( 'Convert', function () {

  describe( '#file()', function () {

    describe( 'nonexistent file', function () {

      var filename = 'file-that-does-not-exist.wav';
      var inputFilename = path.resolve( path.join( __dirname, 'audio', filename ) );
      var outputFilename = inputFilename + '.wav';

      before( 'ensure input file does not exist', function ( done ) {
        fs.exists( inputFilename, function ( exists ) {

          if ( exists ) {
            return done( new Error( 'Input file exists.' ) );
          }

          done();

        } );
      } );

      before( 'ensure output file does not exist', function ( done ) {

        // Check if output file already exists
        fs.exists( outputFilename, function ( exists ) {

          if ( !exists ) {
            return done();
          }

          // Remove preexisting output file
          fs.unlink( outputFilename, function ( err ) {

            if ( err ) {
              return done( err );
            }

            done();

          } );

        } );

      } );

      it( 'should throw an error', function ( done ) {
        Wav.convert.file( inputFilename, outputFilename, function ( err ) {

          if ( !err ) {
            return done( 'Did not throw an error.' );
          }

          done();

        } );
      } );

      it( 'should not create the output file', function ( done ) {
        fs.exists( outputFilename, function ( exists ) {

          if ( exists ) {
            return done( new Error( 'Created output file.' ) );
          }

          done();

        } );
      } );

      it( 'should not overwrite the output file' );

    } );

    describe( 'invalid file', function () {

      var filename = 'convert.js';
      var inputFilename = path.resolve( path.join( __dirname, filename ) );
      var outputFilename = inputFilename + '.wav';

      before( 'ensure input file exists', function ( done ) {
        fs.exists( inputFilename, function ( exists ) {

          if ( !exists ) {
            return done( new Error( 'Input file does not exist.' ) );
          }

          done();

        } );
      } );

      before( 'ensure output file does not exist', function ( done ) {

        // Check if output file already exists
        fs.exists( outputFilename, function ( exists ) {

          if ( !exists ) {
            return done();
          }

          // Remove preexisting output file
          fs.unlink( outputFilename, function ( err ) {

            if ( err ) {
              return done( err );
            }

            done();

          } );

        } );

      } );

      it( 'should throw an error', function ( done ) {
        Wav.convert.file( inputFilename, outputFilename, function ( err ) {

          if ( !err ) {
            return done( 'Did not throw an error.' );
          }

          done();

        } );
      } );

      it( 'should not create the output file', function ( done ) {
        fs.exists( outputFilename, function ( exists ) {

          if ( exists ) {
            return done( new Error( 'Created output file.' ) );
          }

          done();

        } );
      } );

      it( 'should not overwrite the output file' );

    } );

    describe( 'T2a6uvl5c4m7ozqnt37wejkt32a.wav', function () {

      var filename = 'T2a6uvl5c4m7ozqnt37wejkt32a.wav';
      var inputFilename = path.resolve( path.join( __dirname, 'audio', filename ) );
      var outputFilename = inputFilename + '.wav';

      before( 'ensure input file exists', function ( done ) {
        fs.exists( inputFilename, function ( exists ) {

          if ( !exists ) {
            return done( new Error( 'Input file does not exist.' ) );
          }

          done();

        } );
      } );

      before( 'ensure output file does not exist', function ( done ) {

        // Check if output file already exists
        fs.exists( outputFilename, function ( exists ) {

          if ( !exists ) {
            return done();
          }

          // Remove preexisting output file
          fs.unlink( outputFilename, function ( err ) {

            if ( err ) {
              return done( err );
            }

            done();

          } );

        } );

      } );

      it( 'should create the output file' );

      it( 'should overwrite the output file' );

      it( 'should create a valid output wav file' );

      it( 'should create a correct output wav file' );

    } );

  } );

  describe.skip( '#dir()', function () {

    //

  } );

} );
