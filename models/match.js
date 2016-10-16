//USER MODEL

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//Schema for USER

var matchSchema = new Schema({

	city: {type: String},
	club: {type: String},
	date: {type: Date},
	fecha: {type: Date},
	cat: {type: String},
	players: {type: [String]},
	owner: {type: String}
});



//Create the MODEL

module.exports = mongoose.model('Match', matchSchema);
