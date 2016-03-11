'use strict';

var Wav = require( '..' );
var path = require( 'path' );

describe( 'File', function () {

  describe( '#hash()', function () {

    describe( 'nonexistent file', function () {

      var filename = path.resolve( __dirname, './audio/nonexistent-file.wav' );

      it( 'should throw an error', function ( done ) {
        Wav.file.hash( filename, function ( err ) {

          // Ensure error
          if ( !err ) {
            return done( new Error( 'Expected error.' ) );
          }

          // LGTM
          done();

        } );
      } );

    } );

    describe( 'invalid wav file', function () {

      var filename = path.resolve( __dirname, './file.js' );

      it( 'should throw an error', function ( done ) {
        Wav.file.hash( filename, function ( err ) {

          // Ensure error
          if ( !err ) {
            return done( new Error( 'Expected error.' ) );
          }

          // LGTM
          done();

        } );
      } );

    } );

    describe( 'T2a6uvl5c4m7ozqnt37wejkt32a.wav', function () {

      var filename = path.resolve( __dirname, './audio/T2a6uvl5c4m7ozqnt37wejkt32a.wav' );

      it( 'should calculate correct hash', function ( done ) {

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

    } );

    describe( 'T2aaoxo63yfkykfmdr7yehuzqza.wav', function () {

      var filename = path.resolve( __dirname, './audio/T2aaoxo63yfkykfmdr7yehuzqza.wav' );

      it( 'should calculate correct hash', function ( done ) {

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

  } );

  describe( '#read()', function () {

    describe( 'nonexistent file', function () {

      var filename = path.resolve( __dirname, './audio/nonexistent-file.wav' );

      it( 'should throw an error', function ( done ) {
        Wav.file.read( filename, {}, function ( err ) {

          // Ensure error
          if ( !err ) {
            return done( new Error( 'Expected error.' ) );
          }

          // LGTM
          done();

        } );
      } );

    } );

    describe( 'invalid wav file', function () {

      var filename = path.resolve( __dirname, './file.js' );

      it( 'should throw an error', function ( done ) {
        Wav.file.read( filename, {}, function ( err ) {

          // Ensure error
          if ( !err ) {
            return done( new Error( 'Expected error.' ) );
          }

          // LGTM
          done();

        } );
      } );

    } );

    describe( 'T2a6uvl5c4m7ozqnt37wejkt32a.wav', function () {

      var filename = path.resolve( __dirname, './audio/T2a6uvl5c4m7ozqnt37wejkt32a.wav' );

      it( 'should not calculate hash or data', function ( done ) {
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

      it( 'should have correct format data', function ( done ) {
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

      it( 'should calculate correct hash', function ( done ) {

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

      it( 'should calculate data but not hash', function ( done ) {
        Wav.file.read( filename, { data: true }, function ( err, file ) {

          if ( err ) {
            return done( err );
          }

          // Ensure hash is not set
          if ( 'hash' in file ) {
            return done( new Error( 'Hash should not be set.' ) );
          }

          // Ensure data is set
          if ( !( 'data' in file ) ) {
            return done( new Error( 'Data should be set.' ) );
          }

          // LGTM
          done();

        } );
      } );

      it( 'should calculate hash and data', function ( done ) {
        Wav.file.read( filename, { hash: true, data: true }, function ( err, file ) {

          if ( err ) {
            return done( err );
          }

          // Ensure hash is set
          if ( !( 'hash' in file ) ) {
            return done( new Error( 'Hash should be set.' ) );
          }

          // Ensure data is set
          if ( !( 'data' in file ) ) {
            return done( new Error( 'Data should be set.' ) );
          }

          // LGTM
          done();

        } );
      } );

    } );

    describe( 'T2aaoxo63yfkykfmdr7yehuzqza.wav', function () {

      var filename = path.resolve( __dirname, './audio/T2aaoxo63yfkykfmdr7yehuzqza.wav' );

      it( 'should not calculate hash or data', function ( done ) {
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

      it( 'should have correct format data', function ( done ) {
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

      it( 'should calculate correct hash', function ( done ) {

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

      it( 'should calculate data but not hash', function ( done ) {
        Wav.file.read( filename, { data: true }, function ( err, file ) {

          if ( err ) {
            return done( err );
          }

          // Ensure hash is not set
          if ( 'hash' in file ) {
            return done( new Error( 'Hash should not be set.' ) );
          }

          // Ensure data is set
          if ( !( 'data' in file ) ) {
            return done( new Error( 'Data should be set.' ) );
          }

          // LGTM
          done();

        } );
      } );

      it( 'should calculate hash and data', function ( done ) {
        Wav.file.read( filename, { hash: true, data: true }, function ( err, file ) {

          if ( err ) {
            return done( err );
          }

          // Ensure hash is set
          if ( !( 'hash' in file ) ) {
            return done( new Error( 'Hash should be set.' ) );
          }

          // Ensure data is set
          if ( !( 'data' in file ) ) {
            return done( new Error( 'Data should be set.' ) );
          }

          // LGTM
          done();

        } );
      } );

    } );

  } );

  describe.skip( '#write()', function () {

    describe( 'correct data', function () {

      it( 'should write to file' );

    } );

    describe( 'incorrect data', function () {

      it( 'should throw an error' );

      it( 'should not write to file' );

    } );

  } );

} );
