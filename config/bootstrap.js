const fs 	= require('fs'); 

function createModelFile (object) {
	var schema = object.model_name+'Schema'; 
	var properties = ''; 
	for (var i=0; i<object.properties.length; i++ ) {
		var row = `${object.properties[i].property} : ${object.properties[i].type} \n`; 
		properties = `\t\t ${properties} ${row} `; 
	} 
	var contentFile = `
		var mongoose \t\t= require('mongoose');\n
		var ${schema} \t\t= new mongoose.Schema({
			${properties}
		}) \n\n
		var ${object.model_name} = mongoose.model('${object.model_name}', ${schema}); 
	`; 
	
	fs.stat('models', (err) => {
		if(!err) {
			console.log('The folder already exists');
		}
		else if (err.code === 'ENOENT') {
        	fs.mkdirSync('models'); 
        	fs.writeFile(`models/${object.model_name}.js`, contentFile, (err) => {
				if (err) throw err; 
				console.log('The file was successufully created'); 
			}); 
    	}
	})
}

module.exports = {
	createModelFile
}