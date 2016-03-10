'use strict';

var Wav = require( '../' );
var path = require( 'path' );

describe( 'File', function () {

  describe( '#hash()', function () {

    it( 'should throw an error for nonexistent file', function ( done ) {

      var filename = path.resolve( __dirname, './audio/nonexistent-file.wav' );

      Wav.file.hash( filename, function ( err ) {

        // Ensure error
        if ( !err ) {
          return done( new Error( 'Expected error.' ) );
        }

        // LGTM
        done();

      } );

    } );

    it( 'should throw an error for invalid wav file', function ( done ) {

      var filename = path.resolve( __dirname, './file.js' );

      Wav.file.hash( filename, function ( err ) {

        // Ensure error
        if ( !err ) {
          return done( new Error( 'Expected error.' ) );
        }

        // LGTM
        done();

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
        if ( hash.toLowerCase() !== expected.toLowerCase() ) {
          return done( new Error( 'Expected and actual values do not match.' ) );
        }

        // LGTM
        done();

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
        if ( hash.toLowerCase() !== expected.toLowerCase() ) {
          return done( new Error( 'Expected and actual values do not match.' ) );
        }

        // LGTM
        done();

      } );

    } );

  } );

  describe( '#read()', function () {

    it( 'should throw an error for nonexistent file', function ( done ) {

      var filename = path.resolve( __dirname, './audio/nonexistent-file.wav' );

      Wav.file.read( filename, {}, function ( err ) {

        // Ensure error
        if ( !err ) {
          return done( new Error( 'Expected error.' ) );
        }

        // LGTM
        done();

      } );

    } );

    it( 'should throw an error for invalid wav file', function ( done ) {

      var filename = path.resolve( __dirname, './file.js' );

      Wav.file.read( filename, {}, function ( err ) {

        // Ensure error
        if ( !err ) {
          return done( new Error( 'Expected error.' ) );
        }

        // LGTM
        done();

      } );

    } );

    it( 'should not calculate hash or data for file T2a6uvl5c4m7ozqnt37wejkt32a.wav', function ( done ) {

      var filename = path.resolve( __dirname, './audio/T2a6uvl5c4m7ozqnt37wejkt32a.wav' );

      Wav.file.read( filename, {}, function ( err, file ) {

        if ( err ) {
          return done( err );
        }

        // Ensure hash is not set
        if ( 'hash' in file ) {
          return done( new Error( 'Hash should not be set.' ) );
        }

        // Ensure data is not set
        if ( 'data' in file ) {
          return done( new Error( 'Data should not be set.' ) );
        }

        // LGTM
        done();

      } );

    } );

    it( 'should not calculate hash or data for file T2aaoxo63yfkykfmdr7yehuzqza.wav', function ( done ) {

      var filename = path.resolve( __dirname, './audio/T2aaoxo63yfkykfmdr7yehuzqza.wav' );

      Wav.file.read( filename, {}, function ( err, file ) {

        if ( err ) {
          return done( err );
        }

        // Ensure hash is not set
        if ( 'hash' in file ) {
          return done( new Error( 'Hash should not be set.' ) );
        }

        // Ensure data is not set
        if ( 'data' in file ) {
          return done( new Error( 'Data should not be set.' ) );
        }

        // LGTM
        done();

      } );

    } );

    it( 'should have correct format data for file T2a6uvl5c4m7ozqnt37wejkt32a.wav', function ( done ) {

      var filename = path.resolve( __dirname, './audio/T2a6uvl5c4m7ozqnt37wejkt32a.wav' );

      Wav.file.read( filename, {}, function ( err, file ) {

        if ( err ) {
          return done( err );
        }

        // Ensure sample rate is correct
        if ( file.sampleRate !== 8000 ) {
          return done( new Error( 'Incorrect sample rate.' ) );
        }

        // Ensure bits per sample is correct
        if ( file.bitsPerSample !== 16 ) {
          return done( new Error( 'Incorrect bits per sample.' ) );
        }

        // Ensure number of channels is correct
        if ( file.numChannels !== 1 ) {
          return done( new Error( 'Incorrect number of channels.' ) );
        }

        // LGTM
        done();

      } );

    } );

    it( 'should have correct format data for file T2aaoxo63yfkykfmdr7yehuzqza.wav', function ( done ) {

      var filename = path.resolve( __dirname, './audio/T2aaoxo63yfkykfmdr7yehuzqza.wav' );

      Wav.file.read( filename, {}, function ( err, file ) {

        if ( err ) {
          return done( err );
        }

        // Ensure sample rate is correct
        if ( file.sampleRate !== 8000 ) {
          return done( new Error( 'Incorrect sample rate.' ) );
        }

        // Ensure bits per sample is correct
        if ( file.bitsPerSample !== 16 ) {
          return done( new Error( 'Incorrect bits per sample.' ) );
        }

        // Ensure number of channels is correct
        if ( file.numChannels !== 1 ) {
          return done( new Error( 'Incorrect number of channels.' ) );
        }

        // LGTM
        done();

      } );

    } );

    it( 'should calculate correct hash for file T2a6uvl5c4m7ozqnt37wejkt32a.wav', function ( done ) {

      var filename = path.resolve( __dirname, './audio/T2a6uvl5c4m7ozqnt37wejkt32a.wav' );
      var expected = 'AC7A05D0EE017731F5BDA0CAA45A8A553AE3A8CA828694932C9EB2A49BD4ADC3';

      Wav.file.read( filename, { hash: true }, function ( err, file ) {

        if ( err ) {
          return done( err );
        }

        // Ensure hash is correct
        if ( file.hash.toLowerCase() !== expected.toLowerCase() ) {
          return done( new Error( 'Expected and actual values do not match.' ) );
        }

        // LGTM
        done();

      } );

    } );

    it( 'should calculate correct hash for file T2aaoxo63yfkykfmdr7yehuzqza.wav', function ( done ) {

      var filename = path.resolve( __dirname, './audio/T2aaoxo63yfkykfmdr7yehuzqza.wav' );
      var expected = '118DA6568EE44D31A7335185563866A447C6B3CC76FFAB181CC00E4EF4BD5AC0';

      Wav.file.read( filename, { hash: true }, function ( err, file ) {

        if ( err ) {
          return done( err );
        }

        // Ensure hash is correct
        if ( file.hash.toLowerCase() !== expected.toLowerCase() ) {
          return done( new Error( 'Expected and actual values do not match.' ) );
        }

        // LGTM
        done();

      } );

    } );

  } );

} )
;
