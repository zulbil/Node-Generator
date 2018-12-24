var mongoose 	= require('mongoose'); 
var db 			= mongoose.connection; 

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/test', {useNewUrlParser: true }); 

db.on('error', console.error.bind(console, 'Connection Failed'));
db.once('open', function() {
  console.log('Connected!'); 
});

module.exports = {mongoose}