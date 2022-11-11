const path = require( "path" );
module.exports = {
	webpack: {
		alias: {
			'@app_components' : path.resolve( __dirname, "src/app/components/" ),
			'@app_views' : path.resolve( __dirname, "src/app/views/" ),
			'@app_contexts' : path.resolve( __dirname, "src/app/contexts/" ),
			'@styles' : path.resolve( __dirname, "src/styles/" ),
			'@utilities' : path.resolve( __dirname, "src/utilities/" ),
			'@game' : path.resolve( __dirname, "src/game/" ),
			'@store' : path.resolve( __dirname, "src/store/" ),
			'@networking' : path.resolve( __dirname, "src/networking/" ),
			'@assets' : path.resolve( __dirname, "src/assets/" ),
		}
	}
}