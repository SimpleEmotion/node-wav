'use strict';

var Wav = require( '..' );
var fs = require( 'fs' );
var path = require( 'path' );

describe( 'Convert', function () {

  describe( '#file()', function () {

    describe( 'file-does-not-exist.wav', function () {

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

      after( 'remove output file', function ( done ) {
        fs.unlink( outputFilename, function ( err ) {

          if ( err ) {
            return done( err );
          }

          done();

        } );
      } );

      it( 'should throw an error', function ( done ) {
        Wav.convert.file( inputFilename, outputFilename, {}, function ( err ) {

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

      it( 'should not overwrite the output file', function ( done ) {

        // Create empty file for reference
        fs.open( outputFilename, 'w', function ( err, fd ) {

          if ( err ) {
            return done( err );
          }

          fs.close( fd, function ( err ) {

            if ( err ) {
              return done( err );
            }

            fs.stat( outputFilename, function ( err, stats ) {

              if ( err ) {
                return done( err );
              }

              var emptySize = stats.size;

              Wav.convert.file( inputFilename, outputFilename, {}, function ( err ) {

                if ( err ) {
                  return done( err );
                }

                fs.stat( outputFilename, function ( err, stats ) {

                  if ( err ) {
                    return done( err );
                  }

                  if ( stats.size !== emptySize ) {
                    return done( new Error( 'Overwrite output file.' ) );
                  }

                  done();

                } );

              } );

            } );

          } );

        } );

      } );

    } );

    describe( 'file.js', function () {

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

      after( 'remove output file', function ( done ) {
        fs.unlink( outputFilename, function ( err ) {

          if ( err ) {
            return done( err );
          }

          done();

        } );
      } );

      it( 'should throw an error', function ( done ) {
        Wav.convert.file( inputFilename, outputFilename, {}, function ( err ) {

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

      it( 'should not overwrite the output file', function ( done ) {

        // Create empty file for reference
        fs.open( outputFilename, 'w', function ( err, fd ) {

          if ( err ) {
            return done( err );
          }

          fs.close( fd, function ( err ) {

            if ( err ) {
              return done( err );
            }

            fs.stat( outputFilename, function ( err, stats ) {

              if ( err ) {
                return done( err );
              }

              var emptySize = stats.size;

              Wav.convert.file( inputFilename, outputFilename, {}, function ( err ) {

                if ( err ) {
                  return done( err );
                }

                fs.stat( outputFilename, function ( err, stats ) {

                  if ( err ) {
                    return done( err );
                  }

                  if ( stats.size !== emptySize ) {
                    return done( new Error( 'Overwrite output file.' ) );
                  }

                  done();

                } );

              } );

            } );

          } );

        } );

      } );

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

      after( 'remove output file', function ( done ) {
        fs.unlink( outputFilename, function ( err ) {

          if ( err ) {
            return done( err );
          }

          done();

        } );
      } );

      it( 'should not throw an error', function ( done ) {
        Wav.convert.file( inputFilename, outputFilename, {}, function ( err ) {

          if ( err ) {
            return done( err );
          }

          done();

        } );
      } );

      it( 'should create the output file', function ( done ) {
        fs.exists( outputFilename, function ( exists ) {

          if ( !exists ) {
            return done( new Error( 'Did not create output file.' ) );
          }

          done();

        } );
      } );

      it( 'should overwrite the output file', function ( done ) {

        // Create empty file for reference
        fs.open( outputFilename, 'w', function ( err, fd ) {

          if ( err ) {
            return done( err );
          }

          fs.close( fd, function ( err ) {

            if ( err ) {
              return done( err );
            }

            fs.stat( outputFilename, function ( err, stats ) {

              if ( err ) {
                return done( err );
              }

              var emptySize = stats.size;

              Wav.convert.file( inputFilename, outputFilename, {}, function ( err ) {

                if ( err ) {
                  return done( err );
                }

                fs.stat( outputFilename, function ( err, stats ) {

                  if ( err ) {
                    return done( err );
                  }

                  if ( stats.size === emptySize ) {
                    return done( new Error( 'Did not overwrite output file.' ) );
                  }

                  done();

                } );

              } );

            } );

          } );

        } );

      } );

      it( 'should create a valid output wav file', function ( done ) {

        // A valid wav file is one that we can read without error
        Wav.file.read( outputFilename, {}, function ( err ) {

          if ( err ) {
            return done( err );
          }

          done();

        } );

      } );

      it( 'should create a correct output wav file', function ( done ) {

        var expected = 'AC7A05D0EE017731F5BDA0CAA45A8A553AE3A8CA828694932C9EB2A49BD4ADC3';

        // A correct conversion occurs if we calculate the expected hash
        Wav.file.hash( outputFilename, function ( err, hash ) {

          if ( err ) {
            return done( err );
          }

          // Ensure hash is correct
          if ( hash !== expected ) {
            return done( new Error( 'Converted incorrectly.' ) );
          }

          done();

        } );

      } );

    } );

    describe( 'T2aaoxo63yfkykfmdr7yehuzqza.wav', function () {

      var filename = 'T2aaoxo63yfkykfmdr7yehuzqza.wav';
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

      after( 'remove output file', function ( done ) {
        fs.unlink( outputFilename, function ( err ) {

          if ( err ) {
            return done( err );
          }

          done();

        } );
      } );

      it( 'should not throw an error', function ( done ) {
        Wav.convert.file( inputFilename, outputFilename, {}, function ( err ) {

          if ( err ) {
            return done( err );
          }

          done();

        } );
      } );

      it( 'should create the output file', function ( done ) {
        fs.exists( outputFilename, function ( exists ) {

          if ( !exists ) {
            return done( new Error( 'Did not create output file.' ) );
          }

          done();

        } );
      } );

      it( 'should overwrite the output file', function ( done ) {

        // Create empty file for reference
        fs.open( outputFilename, 'w', function ( err, fd ) {

          if ( err ) {
            return done( err );
          }

          fs.close( fd, function ( err ) {

            if ( err ) {
              return done( err );
            }

            fs.stat( outputFilename, function ( err, stats ) {

              if ( err ) {
                return done( err );
              }

              var emptySize = stats.size;

              Wav.convert.file( inputFilename, outputFilename, {}, function ( err ) {

                if ( err ) {
                  return done( err );
                }

                fs.stat( outputFilename, function ( err, stats ) {

                  if ( err ) {
                    return done( err );
                  }

                  if ( stats.size === emptySize ) {
                    return done( new Error( 'Did not overwrite output file.' ) );
                  }

                  done();

                } );

              } );

            } );

          } );

        } );

      } );

      it( 'should create a valid output wav file', function ( done ) {

        // A valid wav file is one that we can read without error
        Wav.file.read( outputFilename, {}, function ( err ) {

          if ( err ) {
            return done( err );
          }

          done();

        } );

      } );

      it( 'should create a correct output wav file', function ( done ) {

        var expected = '118DA6568EE44D31A7335185563866A447C6B3CC76FFAB181CC00E4EF4BD5AC0';

        // A correct conversion occurs if we calculate the expected hash
        Wav.file.hash( outputFilename, function ( err, hash ) {

          if ( err ) {
            return done( err );
          }

          // Ensure hash is correct
          if ( hash !== expected ) {
            return done( new Error( 'Converted incorrectly.' ) );
          }

          done();

        } );

      } );

    } );

    describe( 'T2aaoxo63yfkykfmdr7yehuzqza.mp3', function () {

      var filename = 'T2aaoxo63yfkykfmdr7yehuzqza.mp3';
      var inputFilename = path.resolve( path.join( __dirname, 'audio', filename ) );
      var outputFilename = inputFilename + '.wav';

      describe( 'options = {}', function () {

        before( 'ensure input file exists', function ( done ) {
          fs.exists( inputFilename, function ( exists ) {

            if ( !exists ) {
              return done( new Error( 'Input file does not exist.' ) );
            }

            done();

          } );
        } );

        before( 'ensure output file does not exist', function ( done ) {
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

        after( 'remove output file', function ( done ) {
          fs.unlink( outputFilename, function ( err ) {

            if ( err ) {
              return done( err );
            }

            done();

          } );
        } );

        it( 'should not throw an error', function ( done ) {
          Wav.convert.file( inputFilename, outputFilename, {}, function ( err ) {

            if ( err ) {
              return done( err );
            }

            done();

          } );
        } );

        it( 'should create the output file', function ( done ) {
          fs.exists( outputFilename, function ( exists ) {

            if ( !exists ) {
              return done( new Error( 'Did not create output file.' ) );
            }

            done();

          } );
        } );

        it( 'should overwrite the output file', function ( done ) {

          // Create empty file for reference
          fs.open( outputFilename, 'w', function ( err, fd ) {

            if ( err ) {
              return done( err );
            }

            fs.close( fd, function ( err ) {

              if ( err ) {
                return done( err );
              }

              fs.stat( outputFilename, function ( err, stats ) {

                if ( err ) {
                  return done( err );
                }

                var emptySize = stats.size;

                Wav.convert.file( inputFilename, outputFilename, {}, function ( err ) {

                  if ( err ) {
                    return done( err );
                  }

                  fs.stat( outputFilename, function ( err, stats ) {

                    if ( err ) {
                      return done( err );
                    }

                    if ( stats.size === emptySize ) {
                      return done( new Error( 'Did not overwrite output file.' ) );
                    }

                    done();

                  } );

                } );

              } );

            } );

          } );

        } );

        it( 'should create a valid output wav file', function ( done ) {

          // A valid wav file is one that we can read without error
          Wav.file.read( outputFilename, {}, function ( err ) {

            if ( err ) {
              return done( err );
            }

            done();

          } );

        } );

        it( 'should create a correct output wav file', function ( done ) {

          var expected = 'AA4026AA1A6A2D59AC01427F4A2D3B239CDD955BD309678C4EF1CC8490E968C1';

          // A correct conversion occurs if we calculate the expected hash
          Wav.file.hash( outputFilename, function ( err, hash ) {

            if ( err ) {
              return done( err );
            }

            // Ensure hash is correct
            if ( hash !== expected ) {
              return done( new Error( 'Converted incorrectly.' ) );
            }

            done();

          } );

        } );

      } );

      describe( 'options = { mix: true }', function () {

        before( 'ensure input file exists', function ( done ) {
          fs.exists( inputFilename, function ( exists ) {

            if ( !exists ) {
              return done( new Error( 'Input file does not exist.' ) );
            }

            done();

          } );
        } );

        before( 'ensure output file does not exist', function ( done ) {
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

        after( 'remove output file', function ( done ) {
          fs.unlink( outputFilename, function ( err ) {

            if ( err ) {
              return done( err );
            }

            done();

          } );
        } );

        it( 'should not throw an error', function ( done ) {
          Wav.convert.file( inputFilename, outputFilename, { mix: true }, function ( err ) {

            if ( err ) {
              return done( err );
            }

            done();

          } );
        } );

        it( 'should create the output file', function ( done ) {
          fs.exists( outputFilename, function ( exists ) {

            if ( !exists ) {
              return done( new Error( 'Did not create output file.' ) );
            }

            done();

          } );
        } );

        it( 'should overwrite the output file', function ( done ) {

          // Create empty file for reference
          fs.open( outputFilename, 'w', function ( err, fd ) {

            if ( err ) {
              return done( err );
            }

            fs.close( fd, function ( err ) {

              if ( err ) {
                return done( err );
              }

              fs.stat( outputFilename, function ( err, stats ) {

                if ( err ) {
                  return done( err );
                }

                var emptySize = stats.size;

                Wav.convert.file( inputFilename, outputFilename, { mix: true }, function ( err ) {

                  if ( err ) {
                    return done( err );
                  }

                  fs.stat( outputFilename, function ( err, stats ) {

                    if ( err ) {
                      return done( err );
                    }

                    if ( stats.size === emptySize ) {
                      return done( new Error( 'Did not overwrite output file.' ) );
                    }

                    done();

                  } );

                } );

              } );

            } );

          } );

        } );

        it( 'should create a valid output wav file', function ( done ) {

          // A valid wav file is one that we can read without error
          Wav.file.read( outputFilename, {}, function ( err ) {

            if ( err ) {
              return done( err );
            }

            done();

          } );

        } );

        it( 'should create a correct output wav file', function ( done ) {

          var expected = '118DA6568EE44D31A7335185563866A447C6B3CC76FFAB181CC00E4EF4BD5AC0';

          // A correct conversion occurs if we calculate the expected hash
          Wav.file.hash( outputFilename, function ( err, hash ) {

            if ( err ) {
              return done( err );
            }

            // Ensure hash is correct
            if ( hash !== expected ) {
              return done( new Error( 'Converted incorrectly.' ) );
            }

            done();

          } );

        } );

      } );

    } );

  } );

  describe.skip( '#dir()', function () {

    //

  } );

} );
