const path = require( "path" );
module.exports = {
	webpack: {
		alias: {
			'@components' : path.resolve( __dirname, "src/app/components/" ),
			'@styles' : path.resolve( __dirname, "src/styles/" ),
			'@utilities' : path.resolve( __dirname, "src/utilities/" ),
			'@game' : path.resolve( __dirname, "src/game/" ),
			'@store' : path.resolve( __dirname, "src/store/" ),
			'@networking' : path.resolve( __dirname, "src/networking/" ),
			'@assets' : path.resolve( __dirname, "src/assets/" ),
		}
	}
}