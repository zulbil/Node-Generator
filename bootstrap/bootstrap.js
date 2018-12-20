const fs 		= require('fs'); 
const beautify 	= require('js-beautify').js; 
function createModelFile (object) {
	var schema = object.model_name+'Schema'; 
	var properties = ''; 
	for (var i=0; i<object.properties.length; i++ ) {
		var row = `${object.properties[i].property} : ${object.properties[i].type}, \n`; 
		properties = `${properties} ${row}`; 
	} 
	var contentFile = `
		var mongoose = require('mongoose');\n
		var ${schema} = new mongoose.Schema({
			${properties}
		}) \n\n
		var ${object.model_name} = mongoose.model('${object.model_name}', ${schema}); 
	`; 
	contentFile = beautify(contentFile, { indent_size: 4, space_in_empty_paren: true }); 
	fs.stat('models', (err) => {
		if(!err) {
			console.log('The folder already exists');
			fs.writeFile(`models/${object.model_name}.js`, contentFile, (err) => {
				if (err) throw err; 
				console.log('The file was successfully created'); 
			});
		}
		else if (err.code === 'ENOENT') {
        	fs.mkdirSync('models'); 
        	fs.writeFile(`models/${object.model_name}.js`, contentFile, (err) => {
				if (err) throw err; 
				console.log('The file was successfully created'); 
			}); 
    	}
	})
}

module.exports = {
	createModelFile
}