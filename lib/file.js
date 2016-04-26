'use strict';

var fs = require( 'fs' );
var crypto = require( 'crypto' );

module.exports = {
  hash: hash,
  read: read,
  write: write
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
    file.duration = file.dataChunkSize / file.blockAlign / file.numChannels / file.sampleRate;

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

        file.data = new Array( Math.ceil( file.dataChunkSize / file.blockAlign ) );

        var c = 1.0 / ( 1 << ( file.bitsPerSample - 1 ) );
        for ( var i = 0, n = 0; i < file.dataChunkSize; i += file.blockAlign, n++ ) {

          // Read sample
          var sample = data.readInt16LE( i );

          // Convert to float64 [-1, 1] sample
          file.data[ n ] = sample * c;

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
 * @param {number} channels - number of channels
 * @param {number} fs - samples per second
 * @param {number} bits - bits per sample
 * @param {Array.<number>} data - float64 [-1, 1] array of samples
 * @param {fileWriteCallback} done - callback
 */
function write( filename, channels, fs, bits, data, done ) {

  // SPEC: https://ccrma.stanford.edu/courses/422/projects/WaveFormat/
  var buffer = new Buffer( 44 + data.length * channels * bits / 8 );

  // TODO: implement some sort of validation

  // Write wav header to buffer
  buffer.write( 'RIFF', 0 );                              // ChunkID
  buffer.writeUInt32LE( buffer.length - 8, 4 );           // ChunkSize
  buffer.write( 'WAVE', 8 );                              // Format
  buffer.write( 'fmt ', 12 );                             // Subchunk1ID
  buffer.writeUInt32LE( 16, 16 );                         // Subchunk1Size
  buffer.writeUInt16LE( 1, 20 );                          // AudioFormat
  buffer.writeUInt16LE( channels, 22 );                   // NumChannels
  buffer.writeUInt32LE( fs, 24 );                       // SampleRate
  buffer.writeUInt32LE( fs * channels * bits / 8, 28 ); // ByteRate
  buffer.writeUInt16LE( channels * bits / 8, 32 );        // BlockAlign
  buffer.writeUInt16LE( bits, 34 );                       // BitsPerSample
  buffer.write( 'data', 36 );                             // Subchunk2ID
  buffer.writeUInt32LE( buffer.length - 44, 40 );         // Subchunk2Size

  // Write raw PCM data to buffer
  var mag = ( 1 << 15 ) - 1;
  var N = data.length;
  for ( var i = 0; i < N; i++ ) {

    // Convert float64 [-1, 1] to int16 [-mag, mag] sample
    var sample = Math.floor( data[ i ] * mag );

    // Write sample to buffer
    buffer.writeInt16LE( sample, 44 + i * channels * bits / 8 );

  }

  // Write buffer to file
  fs.writeFile( filename, buffer, done );

}
