'use strict';

var fs = require( 'fs' );
var crypto = require( 'crypto' );
var Util = require( './util' );

module.exports = {
  hash: hash,
  read: read,
  write: write,
  copy: copy,
  normalize: normalize
};

/**
 * @callback fileHashCallback
 * @param {Error} err - Error object
 * @param {string} hash - hash of wav file data
 */

/**
 * Computes wav data hash of file `filename`.
 *
 * This method is essentially a wrapper around `read`.
 *
 * @param {string} filename - input filename of wav file used to compute hash
 * @param {fileHashCallback} done - callback
 */
function hash( filename, done ) {
  read( filename, { hash: true }, function ( err, file ) {

    if ( err ) {
      return done( err, '' );
    }

    if ( !file.hash ) {
      return done( new Error( 'Unable to calculate file hash.' ), '' );
    }

    done( null, file.hash );

  } );
}

/**
 * @callback fileReadCallback
 * @param {Error} err - Error object
 * @param {Object} file - File object
 */

/**
 * Reads wav file 'filename' to a File object.
 *
 * @param {string} filename - input filename of wav file to read
 * @param {Object} options - options
 * @param {boolean} [options.hash=false] - true if hash of wav data should be calculated
 * @param {boolean} [options.data=false] - true if wav data should be converted to samples
 * @param {fileReadCallback} done - callback
 */
function read( filename, options, done ) {

  options = options || {};

  // Read wav file into buffer
  fs.readFile( filename, function ( err, buffer ) {

    if ( err ) {
      return done( err, null );
    }

    // SPEC: https://ccrma.stanford.edu/courses/422/projects/WaveFormat/
    var file = {};

    var d = 0;

    // Read wav header

    file.chunkId = buffer.toString( 'utf8', d, d + 4 );

    if ( file.chunkId !== 'RIFF' ) {
      return done( new Error( 'Invalid header.' ), null );
    }

    file.chunkSize = buffer.readUInt32LE( d += 4 );
    file.format = buffer.toString( 'utf8', d += 4, d + 4 );

    if ( file.format !== 'WAVE' ) {
      return done( new Error( 'Invalid format.' ), null );
    }

    file.subchunk1Id = buffer.toString( 'utf8', d += 4, d + 4 );

    if ( file.subchunk1Id !== 'fmt ' ) {
      return done( new Error( 'Missing chunk: fmt .' ), null );
    }

    file.subchunk1Size = buffer.readUInt32LE( d += 4 );
    file.audioFormat = buffer.readUInt16LE( d += 4 );

    if ( file.audioFormat !== 1 ) {
      return done( new Error( 'Unsupported audio format.' ), null );
    }

    file.numChannels = buffer.readUInt16LE( d += 2 );
    file.sampleRate = buffer.readUInt32LE( d += 2 );
    file.byteRate = buffer.readUInt32LE( d += 4 );
    file.blockAlign = buffer.readUInt16LE( d += 4 );
    file.bitsPerSample = buffer.readUInt16LE( d += 2 );

    if ( file.subchunk1Size === 18 ) {
      file.cbSize = buffer.readUInt16LE( d += 2 );
    } else if ( file.subchunk1Size !== 16 ) {
      return done( new Error( 'Invalid chunk: format.' ), null );
    }

    file.subchunk2Id = buffer.toString( 'utf8', d += 2, d + 4 );

    if ( file.subchunk2Id === 'LIST' ) {

      file.listChunkSize = buffer.readUInt32LE( d += 4 );
      d += file.listChunkSize;
      file.subchunk3Id = buffer.toString( 'utf8', d += 4, d + 4 );

      if ( file.subchunk3Id === 'data' ) {
        file.dataChunkSize = buffer.readUInt32LE( d += 4 );
        d += 4;
      } else {
        return done( new Error( 'Missing chunk: data.' ), null );
      }

    } else if ( file.subchunk2Id === 'data' ) {
      file.dataChunkSize = buffer.readUInt32LE( d += 4 );
      d += 4;
    } else {
      return done( new Error( 'Unsupported chunk: ' + file.subchunk2Id + '.' ), null );
    }

    file.dataOffset = d;
    file.numSamples = file.dataChunkSize / file.blockAlign / file.numChannels;
    file.duration = file.numSamples / file.sampleRate;

    if ( options.hash || options.data ) {

      var data = buffer.slice( d );

      // Calculate SHA256 hash
      if ( options.hash ) {
        var SHA256 = crypto.createHash( 'SHA256' );
        SHA256.setEncoding( 'hex' );
        SHA256.update( data );
        SHA256.end();
        file.hash = SHA256.read().toUpperCase();
      }

      // Read raw PCM data
      if ( options.data ) {

        if ( file.bitsPerSample !== 16 ) {
          return done( new Error( 'Only 16-bit samples can be converted.' ), null );
        }

        // Channel index
        var c;
        d = 0;

        // Allocate array for channels
        file.data = new Array( file.numChannels );

        // Allocate array for samples in channel
        for ( c = 0; c < file.numChannels; ++c ) {
          file.data[ c ] = new Array( file.numSamples );
        }

        // Normalization factor
        var norm = 1.0 / ( 1 << ( file.bitsPerSample - 1 ) );

        // Loop through samples
        for ( var i = 0; i < file.numSamples; ++i ) {

          // Loop through channels
          for ( c = 0; c < file.numChannels; ++c, d += 2 ) {

            // Read sample
            var sample = data.readInt16LE( d );

            // Convert to float64 [-1, 1] sample
            file.data[ c ][ i ] = sample * norm;

          }

        }

      }

    }

    done( null, file );

  } );

}

/**
 * @callback fileWriteCallback
 * @param {Error} err - Error object
 */

/**
 * Writes wav data to wav file `filename`.
 *
 * @param {string} filename - filename of output file
 * @param {Array.<number>} data - float64 [-1, 1] array of samples
 * @param {number} sampleRate - samples per second
 * @param {number} bitsPerSample - bits per sample
 * @param {fileWriteCallback} done - callback
 */
function write( filename, data, sampleRate, bitsPerSample, done ) {

  var channels = 1;
  var bytesPerSample = bitsPerSample / 8;

  // SPEC: https://ccrma.stanford.edu/courses/422/projects/WaveFormat/
  var buffer = new Buffer( 44 + data.length * channels * bytesPerSample );

  // TODO: implement some sort of validation

  // Write wav header to buffer
  buffer.write( 'RIFF', 0 );                                             // ChunkID
  buffer.writeUInt32LE( buffer.length - 8, 4 );                          // ChunkSize
  buffer.write( 'WAVE', 8 );                                             // Format
  buffer.write( 'fmt ', 12 );                                            // Subchunk1ID
  buffer.writeUInt32LE( 16, 16 );                                        // Subchunk1Size
  buffer.writeUInt16LE( 1, 20 );                                         // AudioFormat
  buffer.writeUInt16LE( channels, 22 );                                  // NumChannels
  buffer.writeUInt32LE( sampleRate, 24 );                                // SampleRate
  buffer.writeUInt32LE( sampleRate * channels * bytesPerSample, 28 ); // ByteRate
  buffer.writeUInt16LE( channels * bytesPerSample, 32 );              // BlockAlign
  buffer.writeUInt16LE( bitsPerSample, 34 );                             // BitsPerSample
  buffer.write( 'data', 36 );                                            // Subchunk2ID
  buffer.writeUInt32LE( buffer.length - 44, 40 );                        // Subchunk2Size

  // Determine normalization factor based on min/max abs value
  var min = Util.min( data );
  var max = Util.max( data );
  var pos = Math.abs( max ) > Math.abs( min );
  var mag = ( 1 << ( bitsPerSample - 1 ) ) - pos;

  // Write raw PCM data to buffer
  for ( var i = 0, n = data.length; i < n; ++i ) {

    // Convert float64 [-1, 1] to int16 [-mag, mag] sample
    var sample = Math.floor( data[ i ] * mag );

    // Write sample to buffer
    buffer.writeInt16LE( sample, 44 + i * channels * bytesPerSample );

  }

  // Write buffer to file
  fs.writeFile( filename, buffer, function ( err ) {

    if ( err ) {
      return done( err );
    }

    done( null );

  } );

}

/**
 * @callback fileCopyCallback
 * @param {Error} err - Error object.
 */

/**
 *
 * @param {string} src - source filename
 * @param {string} dst - destination filename
 * @param {fileCopyCallback} done - callback
 */
function copy( src, dst, done ) {

  var err = null;

  var rd = fs.createReadStream( src );
  var wr = fs.createWriteStream( dst );

  rd.on( 'error', function ( _err ) {
    err = err || _err;
  } );

  wr.on( 'error', function ( _err ) {
    err = err || _err;
  } );

  wr.on( 'close', function () {

    if ( !err ) {
      return done( null );
    }

    // Copy failed, so we need to clean up by removing destination file
    fs.unlink( dst, function () {
      done( err );
    } );

  } );

  rd.pipe( wr );

}

/**
 * @callback fileNormalizeCallback
 * @param {Error} err - Error object
 */

/**
 * Normalizes a single-channel wav file by the absolute-maximum-valued sample.
 *
 * @param {string} filename - filename of wav file to normalize
 * @param {fileNormalizeCallback} done - callback
 */
function normalize( filename, done ) {

  // Read wav file
  read( filename, { data: true }, function ( err, file ) {

    if ( err ) {
      return done( err );
    }

    // Ensure wav file has exactly one channel
    if ( file.numChannels !== 1 ) {
      return done( new Error( 'Wav file must have exactly one channel.' ) );
    }

    // Normalize
    file.data[ 0 ] = Util.normMaxAbs( file.data[ 0 ] );

    // Write wav file
    write( filename, file.data[ 0 ], file.sampleRate, file.bitsPerSample, function ( err ) {

      if ( err ) {
        return done( err );
      }

      done( null );

    } );

  } );

}
