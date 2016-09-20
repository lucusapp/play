var passport = require('passport');
var flash = require('connect-flash');
var matchs = require('../config/match');
var Match = require('../models/match');

module.exports = function(app, passsport){

	// =============================================================================
	// AUTHENTICATE (FIRST LOGIN) ==================================================
	// =============================================================================

	//LOGIN
	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/home',
		failureRedirect: '/index',
		failureFlash: true
	}));


	//SIGNUP
	app.get('/signup', function(req, res){
		res.render('signup.jade', {message: req.flash('signupMessage')});
	});

	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/home',
		failureRedirect : '/signup',
		failureFlash : true
	}));


	//LOGOUT
	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});


	//FACEBOOK ROUTES
	//route for fb auth
	app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));

	//callback
	app.get('/auth/facebook/callback',
	        passport.authenticate('facebook', {
	        	successRedirect: '/home',
	        	failureRedirect: '/profile',
						scope: 'email'
	        }));



	// =============================================================================
	// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
	// =============================================================================

	// Fb -------------------------------

	// send to facebook to do the authentication
	app.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));

	// handle the callback after facebook has authorized the user
	app.get('/connect/facebook/callback',
		passport.authorize('facebook', {
			successRedirect : '/home',
			failureRedirect : '/profile',
			failureFlash: true
	}));

	// =============================================================================
	// UNLINK ACCOUNTS =============================================================
	// =============================================================================
	// used to unlink accounts. for social accounts, just remove the token
	// for local account, remove email and password
	// user account will stay active in case they want to reconnect in the future


	//FB
	app.get('/unlink/facebook', function(req, res){
		var user = req.user;
		user.facebook = undefined;
		user.save(function(err){
			res.redirect('/profile');
		});
	});



};


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/index');
}
