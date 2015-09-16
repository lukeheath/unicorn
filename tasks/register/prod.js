module.exports = function (grunt) {
	grunt.registerTask('prod', [
		'compileAssets',
		'concat',
		'ngAnnotate',
		'uglify',
		'cssmin',
		'clean:build',
		'copy:build'
	]);
};
