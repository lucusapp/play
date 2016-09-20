
//expose our config to our app

module.exports = {
	'facebookAuth' : {
		'clientID' : '792985757511365',
		'clientSecret': '95ddd5bfa387ce0e644e8de9953fb5b5',
		'callbackURL': 'http://localhost:2000/auth/facebook/callback',
		'profileFields': ['email', 'displayName']
	}
};
