/**
 * Module depedencies
 */

var fs = require('fs');
var path = require('path');
var util = require('util');
var _ = require('lodash');
var transformTools = require('browserify-transform-tools');


module.exports = transformTools.makeStringTransform('machinepack', {}, function (code, transformOptions, done) {
  // console.log('Running transform on `%s`...',transformOptions.file);
  if(!transformOptions.config) {
    return done(new Error('Could not find `machinepack` object in package.json file.'));
  }

  var filePath = transformOptions.file;

  // EXTREMELY IMPORTANT:
  // All of this info has to do with the TOP-LEVEL machinepack
  // (i.e. if the current file being transformed is the main index.js of
  //  ANOTHER pack required by the top-level pack, then `packMetadata` etc
  //  will still be referring to the top-level pack!!)
  // var packPath = transformOptions.configData.configDir;
  // var packMetadata = transformOptions.config;
  // var isTopLevelPackIndex = _.endsWith(filePath, path.join(packPath, 'index.js'));
  // console.log('skipping... our check failed:');
  //   console.log('_.endsWith(filePath, path.join(packPath, \'index.js\'))');
  //   console.log('_.endsWith(%s, %s)', filePath, path.join(packPath, 'index.js'));
  // console.log(isTopLevelPackIndex);
  // console.log();
  // console.log();


  // So now, we need to determine whether we are looking at the `index.js` file
  // of ANY machinepack (i.e. not THE machinepack).  We'll determine the path pack,
  // as well as load the pack metadata.
  var packMetadata;
  var packPath;
  try {
    packMetadata = JSON.parse(fs.readFileSync(path.resolve(filePath, '../package.json'), 'utf8')).machinepack;
    // If we made it here, looks like this is a pack.
    if (packMetadata.friendlyName){
      // So we'll determine the path to the pack directory.
      packPath = path.resolve(filePath, '../');
    }
  }
  catch (e) {}
  // console.log('PACKAGE.JSON PATH:',path.resolve(filePath, '../package.json'));
  // console.log('PACK METADATA:',packMetadata);
  // console.log('PACK PATH:',packPath);
  var isThisFilePackIndex = _.isString(packPath) && _.endsWith(filePath, path.join(packPath, 'index.js'));


  // If this is not the `index.js` file of a machinepack, leave
  // the code alone.
  if (!isThisFilePackIndex) {
    return done(null, code);
  }

  // If this is a machinepack, replace the index.js file with
  // a browserify-compatible version of the code that does not use
  // Machine.pack() (because browserify doesn't know how to handle
  // dynamic requires).
  var shimCode = _.reduce(packMetadata.machines, function (memo, machineIdentity){
    var line = util.format('module.exports[Machine.getMethodName(\'%s\')] = Machine.build( require(\'%s\') );\n', machineIdentity, './'+path.join(packMetadata.machineDir,machineIdentity));
    memo += line;
    return memo;
  },
  '// This shim was generated during browserification of this machinepack.\n'+
  '// Because Machine.pack() uses dynamic require() calls, which is not supported \n'+
  '// natively by browserify, the boilerplate index.js file in this pack was automatically\n'+
  '// replaced with explicit requires of each machine herein.\n'+
  'var Machine = require(\'machine\');\n'+
  '\n'+
  'module.exports = {};\n');
  shimCode += '\n';
  // console.log('\n------\n',shimCode,'\n\n');

  return done(null, shimCode);
});
