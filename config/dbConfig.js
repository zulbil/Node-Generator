var {mongoose} 	= require('mongoose'); 
var db 			= mongoose.connection; 

mongoose.connect('mongodb://localhost/test', {urlNewParser: true }); 

db.on('error', console.error.bind(console, 'Connection Failed'));
db.once('open', function() {
  console.log('Connected to the database ...'); 
});