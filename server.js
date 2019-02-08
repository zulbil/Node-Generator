const fs            		= require('fs');
//const {mongoose}    = require('./config/dbConfig');
const commander     		= require('commander');
const yargs         		= require('yargs'); 

var bootstrap_model   		= require('./bootstrap/bootstrap_model'); 
var bootstrap_controller 	= require('./bootstrap/bootstrap_controller'); 

var argv = yargs
		   .command('generate model', 'Generate a new model')
		   .command('generate crud', 'Generate a CRUD fonctionnality for a specific model')
		   .help()
		   .argv; 

//mongoose.Promise    = global.Promise;

console.log('*************************************');
console.log('* Welcome to the Node generator App *');
console.log('*************************************');
console.log('\n'); 

if (argv._[0] == 'generate' && argv.model == 'model' ) {
  bootstrap_model.generateModel(); 
}

if (argv._[0] == 'generate' && argv.model == 'crud' ) {
  bootstrap_controller.generateCrud(); 
}

