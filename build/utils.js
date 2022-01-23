'use strict'

const path = require('path');
const argv = require('yargs').argv;


module.exports = {
	resolve: function (dir) {
		return path.join(__dirname, '..', dir)
	},
	assetsPath: function (_path) {
		const assetsSubDirectory = 'static'
		return path.posix.join(assetsSubDirectory, _path)
	},
	getPublicPath: function() {
		let url = argv && argv.publicPath;
		if (url) {
			if (/^\/|http/.test(url)) {
				url = url;
			} else {
				url = '/' + url;
			}
		} else {
			url = './';
		}
		return url;
	}
}
