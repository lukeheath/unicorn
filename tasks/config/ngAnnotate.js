/**
 * Annotate Angular dependency injection before Uglify's mangle
 *
 * ---------------------------------------------------------------
 *
 * Add, remove and rebuild AngularJS dependency injection annotations. Based on ng-annotate.
 *
 * For usage docs see:
 * 		https://github.com/mzgol/grunt-ng-annotate
 */
module.exports = function(grunt) {

	grunt.config.set('ngAnnotate', {
		build: {
			files: {
				'.tmp/public/concat/production.js': '.tmp/public/concat/production.js'
			}
		}
	});

	grunt.loadNpmTasks('grunt-ng-annotate');
};