var passport = require('passport');
var flash = require('connect-flash');
var matchConfig = require('../config/match');
var Match = require('../models/match');
var Users = require('../models/user');

module.exports = function(app, passsport){
	//Overview
	app.get('/admin', isAdmin, function(req, res){
		Users.find().lean().exec(function(err, users){
			if(!err){
				Match.find().lean().exec(function(err, matchs){
					if(!err){
						res.render('admin/overview.jade',{
							users: users,
							matchs: matchs,
							title: 'Dashboard - Overview'
						});
					}
				});
				
			}
		});
	});

	/****Users View****/
	app.get('/admin/users', isAdmin, function(req, res){
		Users.find().lean().exec(function(err, users){
			if(!err){
				res.render('admin/users.jade',{
					users: users,
					title: 'Dashboard - Users'
				});
			}
		});
	}); 

	//Delete User
	app.get('/admin/deleteuser/:id', isAdmin, function(req, res){
		Users.findByIdAndRemove(req.params.id, function(err, user){
			if(!err)
				res.redirect('/admin/users');
			else{
				res.send(200);
				console.log(err);
			}
		});
	});

	//Make an user admin
	app.get('/admin/makeadmin/:id', isAdmin, function(req, res){
		Users.findById(req.params.id, function(err, user){
			if(!err){
				user.group='admin';
				user.save();
				res.redirect('/admin/users');
			}
			else{
				res.send(200);
				console.log(err);
			}
		});
	});

	//Unmake Admin
	app.get('/admin/notadmin/:id', isAdmin, function(req, res){
		Users.findById(req.params.id, function(err, user){
			if(!err){
				user.group = undefined;
				user.save();
				res.redirect('/admin/users');
			}
			else{
				res.send(200);
				console.log(err);
			}
		});
	});


	/*** MATCHS ***/
	app.get('/admin/matchs', isAdmin, function(req, res){
		Match.find().lean().exec(function(err, matchs){
		  if(!err){
		  	//console.log("Partidos" +matchs);
		    res.render('admin/matchs.jade', {
		    	matchs: matchs,
		    	title: 'Dashboard - Matchs'
		    });
		  }
		  else
		    console.log('Error: '+err);
		});
	});

};

// route middleware to make sure a user is the admin
function isAdmin(req, res, next) {

	// if user is authenticated in the session and his group is admin, carry on 
	if (req.isAuthenticated() && req.user.group === 'admin' )
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}