var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy
  , User = require('../models/user');
var mongoose = require('mongoose');


  passport.use(new FacebookStrategy({
      clientID: '792985757511365',
      clientSecret: '95ddd5bfa387ce0e644e8de9953fb5b5',
      callbackURL: 'http://localhost:2000/auth/facebook/callback',
      profileFields: [ 'email' , 'name' ],
      passReqToCallback:true
    },
    function(req, accessToken, refreshToken, profile, done) {
			// Set the user's provider data and include tokens
			var providerData = profile._json;
			providerData.accessToken = accessToken;
			providerData.refreshToken = refreshToken;

			// Create the user OAuth profile
			var providerUserProfile = {
				firstName: profile.name.givenName,
				lastName: profile.name.familyName,
				fullName: profile.displayName,
				email: profile.emails[0].value,
				username: profile.username,
				provider: 'facebook',
				providerId: profile.id,
				providerData: providerData
			};

			// Save the user OAuth profile
			<users.saveOAuthUserProfile(req, providerUserProfile, done);

    }
  ));


// /var passport = require ('passport');
// var FacebookSt = require('passport-facebook').Strategy;
// var configAuth = require('./auth');
// var User = require('../models/user');




// /
// //FACEBOOK
// passport.use(new FacebookSt({
//   //get auth settings
//   clientID : configAuth.facebookAuth.clientID,
//   clientSecret: configAuth.facebookAuth.clientSecret,
//   callbackURL: configAuth.facebookAuth.callbackURL,
//   profileFields: ['id', 'displayName', 'email', 'name', 'gender', 'profileUrl', 'photos'],
//   passReqToCallback: true
//
// },
// //Facebook send back token and profile
// function(req, token, refreshToken, profile, done){
//   //async
//   process.nextTick(function() {
//
//
//     if(!req.user){ //USER DOESNT EXISTS
//
//       User.findOne({ 'facebook.id' : profile.id}, function(err, user){
//         if(err) return done(err);
//
//         if(user) {
//           // if there is a user id already but no token (user was linked at one point and then removed)
//           // just add our token and profile information
//             if (!user.facebook.token) {
//                 user.facebook.token = token;
//                 user.facebook.name  = profile.name.givenName;
//                 user.facebook.lastName = profile.name.familyName;
//                 user.facebook.email = profile.emails[0].value;
//                 user.facebook.photo = profile.photos[0].value;
//                 user.local.email = profile.emails[0].value; //Save the email from fb if the user doesn't exists
//
//                 user.save(function(err) {
//                     if (err)
//                         throw err;
//                     return done(null, user);
//                 });
//             }
//           return done(null, user);
//         }
//         else { //if the user is new
// console.log(profile);
//           User.findOne({'local.email' : profile.emails[0].value}, function(err, user){
//
//             if(err) return done(err);
//
//             if(!user){
//               var newUser = new User();
//
//               newUser.facebook.id = profile.id;
//               newUser.facebook.token = token;
//               newUser.facebook.name = profile.name.givenName;
//               newUser.facebook.lastName = profile.name.familyName;
//               newUser.facebook.email = profile.emails[0].value;
//               newUser.facebook.photo = profile.photos[0].value;
//               newUser.local.email = profile.emails[0].value //Save the email and name from fb if the user doesn't exists
//               newUser.local.name = profile.name.givenName;
//               newUser.local.lastName = profile.name.familyName;
//
//
//               newUser.save(function(err){
//                 if(err) throw err;
//
//                 return done(null, newUser);
//               });
//             }
//             else
//               if(user.local.password) return done(null, false, req.flash('loginMessage', 'The email from facebook is taken.'));
//               else //User linked his account and unlinked
//                 return done(null,false, req.flash('loginMessage', 'Ule'));
//           });
//         }
//
//       });
//     }
//     else { //USER ALREADY EXISTS
//
//       User.findOne({'facebook.email' : profile.emails[0].value}, function(err, user){
//         if(err) return done(err);
//
//         if(!user){
//           var user = req.user;
//
//           //update user credentials
//           user.facebook.id = profile.id;
//           user.facebook.token = token;
//           user.facebook.name = profile.name.givenName;
//           user.facebook.lastName = profile.name.familyName;
//           user.facebook.email = profile.emails[0].value;
//           user.facebook.photo = profile.photos[0].value;
//
//           //save user
//
//           user.save(function(err) {
//             if(err) throw err;
//             return done(null, user);
//           });
//         }
//         else{
//           return done(null, false, req.flash('loginMessage', 'The email from facebook is taken.'));
//         }
//
//
//       });
//     }
//   });
//
// }));
