var LocalSt = require('passport-local').Strategy;


//user model
var User = require('../models/user');

//auth Variables


//expose this function to the app
module.exports = function(passport){

	//passport session setup
	//persistent login sessions

	passport.serializeUser(function(user, done){
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done){
		User.findById(id, function(err, user){
			done(err, user);
		});
	});



	//LOCAL SIGNUP
	passport.use('local-signup', new LocalSt({

		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true

	},
	function(req, email, password, done){

		//function findOne wont fire until data is sent back
		process.nextTick(function(){

			if(!req.user) { //Si no esta loged creo uno nuevo
				User.findOne({ 'local.email' : email}, function(err, user){
				//if there are any errors
				if(err)
					return done(err);
				//if the user already exists
				if(user) {
					return done( null, false, req.flash('signupMessage', 'That email is already taken.'));
				}

				//if there is no user with that email
				//create user
				else {
					var newUser = new User();
					//Set the user's local credentials
					newUser.local.email = email;
					newUser.local.name = req.body.name;
					newUser.local.lastName = req.body.lastName;
					newUser.local.password = newUser.generateHash(password);

					//Save the user

					newUser.save(function(err) {
						if(err)
							throw err;
						return done(null, newUser);
					});
				}
				});
			}
			else{ //If the user already exists...
				var user = req.user;

				//Set the user's local credentials
				user.local.email = email;
				user.local.name = name;
				user.local.lastName = lastName;
				user.local.password = user.generateHash(password);

				//Save the user

				user.save(function(err) {
					if(err)
						throw err;
					return done(null, user);
				});
			}
		});

	}));

	//LOCAL LOGIN
	passport.use('local-login', new LocalSt({

			usernameField: 'email',
			passwordField: 'password',
			passReqToCallback: true
		},
		function(req, email, password, done) {

			User.findOne({'local.email' : email}, function(err, user){

				if(err)
					return done(err);

				if(!user)
					return done(null, false, req.flash('loginMessage', 'Oops! Wrong user or password.'));

				if(!user.validPassword(password))
					return done(null, false, req.flash('loginMessage', 'Oops! Wrong user or password.'));


				return done(null, user);
			});


	}));




};
