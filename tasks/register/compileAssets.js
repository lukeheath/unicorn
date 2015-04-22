module.exports = function (grunt) {
	grunt.registerTask('compileAssets', [
		'clean:dev',
		'jst:dev',
		'less:dev',
		'cssmin',
		'copy:dev',
		'coffee:dev'
	]);
};
