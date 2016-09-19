


module.exports = function(mongoose){

	var uristring =
	  'mongodb://lucusapp:romimu8888@ds017886.mlab.com:17886/passportfb';
	  process.env.MONGOHQ_URL ||
	  'mongodb://localhost/kdd';

	mongoose.connect(uristring, function(err, res){
		if(err){
			console.log('ERROR: connecting to database. '+err);
		}
		else
			console.log('Connected to Database.');
	});

};
