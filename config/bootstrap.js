const fs 	= require('fs'); 

function createModelFile (object) {
	var schema = object.model_name+'Schema'; 
	var properties = ''; 
	for (var i=0; i<object.properties.length; i++ ) {
		var row = `${object.properties[i].property} : ${object.properties[i].type}, \n`; 
		properties = `${properties} ${row}`; 
	} 
	// var regex = /[[:punct:]]$/g; 
	// properties = properties.replace(regex, ''); 
	// console.log(properties);
	var contentFile = `
		var mongoose = require('mongoose');\n
		var ${schema} = new mongoose.Schema({
			${properties}
		}) \n\n
		var ${object.model_name} = mongoose.model('${object.model_name}', ${schema}); 
	`; 
	
	fs.stat('models', (err) => {
		if(!err) {
			console.log('The folder already exists');
			fs.writeFile(`models/${object.model_name}.js`, contentFile.trim(), (err) => {
				if (err) throw err; 
				console.log('The file was successufully created'); 
			});
		}
		else if (err.code === 'ENOENT') {
        	fs.mkdirSync('models'); 
        	fs.writeFile(`models/${object.model_name}.js`, contentFile.trim(), (err) => {
				if (err) throw err; 
				console.log('The file was successufully created'); 
			}); 
    	}
	})
}

module.exports = {
	createModelFile
}