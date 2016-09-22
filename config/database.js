


module.exports = function(mongoose){

	var uristring =

	  process.env.MONGOHQ_URL ||

		'mongodb://gavialus:romimu8888@ds035036.mlab.com:35036/heroku_8rm2rlw8'

	mongoose.connect(uristring, function(err, res){
		if(err){
			console.log('ERROR: connecting to database. '+err);
		}
		else
			console.log('Connected to Database.');
	});

};
