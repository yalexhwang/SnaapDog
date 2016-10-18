var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var mongoCreds = require('../config/mongoCreds');
var User = require('../models/user');
var Stray_entry = require('../models/stray_entry');
var Posting = require('../models/posting');
var Category = require('../models/category');

// mongoose.connect('mongodb://' + mongoCreds.username + ':' + mongoCreds.password + '@ds057476.mlab.com:57476/snaap_dog');
mongoose.connect(configVar.danielle)

var bcrypt = require('bcrypt-nodejs');
var randToken = require('rand-token');


// LOG IN --------------------------------------------------
router.post('/login', function(req, res, next) {
	var user = req.body.user;
	User.findOne({'username': user.username}, function(err, docs) {
			if (err) {
				console.log(err);
				res.json({
					passFail: 0,
					status: "Failed at findOne"
				});
			} else {
				if (docs == null) {
					console.log(docs);
					res.json({
						passFail: 0,
						status: "Failed at findOne, doc is null"
					});
				} else {
					console.log(docs);
					var passwordCheck = bcrypt.compareSync(user.password, docs.password);
					console.log(passwordCheck);
					if (passwordCheck) {
						var token = randToken.generate(32);
						console.log('token:' + token);
						User.findOneAndUpdate({'_id': docs._id}, {$set: {'token': token}}, {upsert: true, new: true}, function(err, docs) {
							console.log("password checked");
							res.json({
								passFail: 1,
								status: "User found",
								docs: docs
							});
						});
					} else {
							res.json({
								passFail: 0,
								status: 'User name and password did not match.'
							});
					}
				}
			}					
	});
}); //end of login router

// REGISTER --------------------------------------------------
router.post('/register', function(req, res, next) {
	var user = req.body.user;
	console.log(user);
	User.findOne({'username': user.username}, function (err, doc) {
			if (err) {
				console.log('error!');
				console.log(err);
				res.json({
					passFail: 0,
					status: "Failed at finding one" 
				});
			} else {
				if (doc == null) {
					var newUser = new User({
						username: user.username,
						password: bcrypt.hashSync(user.password),
						email: user.email,
						first_name: user.fname,
						last_name: user.lname
					});
					console.log(newUser);
					newUser.save(function(err, saved, status) {
						if (err) {
							console.log(err);
							res.json({
								passFail: 0,
								status: "Registration failed."
							});
						} else {
							console.log(saved);
							res.json({
								passFail: 1,
								status: "Registered!",
								docs: saved,
								token: token
							});
						}
					});
				} else {
					res.json({
						passFail: 0,
						status: "Found a match. Try a different username."
					});
				}
			}
	});
});

// Get stray entries----------------------------------
router.post('/stray_entries', function(req, res, next) {
	Stray_entry.find({}, function(err, docs) {
		console.log("docs");
		console.log(docs);
		if (err) {
			console.log('error');
			console.log(err);
			res.json({
				status: "Error in getting stray_entries",
				passFail: 0
			});
		} else {
			console.log('not error');
			if (docs == null) {
				console.log('null');
				res.json({status: 'No docs found, null', passFail: 0});
			} else {
				console.log(docs);
				res.json({
					passFail: 1,
					docs: docs
				});
			}
		}
	});
});

// Post Categories--------------------------------
router.post('/post_categories', function(req, res, next) {
	Category.find({}, function(err, docs) {
		if (err) { console.log(err); }
		else {
			if (docs == null) {
				res.json({status: 'No docs found, null', passFail: 0});
			} else {
				console.log(docs);
				res.json({
					passFail: 1,
					docs: docs[0]
				});
			}
		}
	});
});

//Beginning of Posting 
router.post('/post', function(req, res, next) {
	var user = req.body.user;
	var post = req.body.post;
	var newPosting = new Posting({
		// photo: req.body.photo,
		// location:{
		// 	coord: {
		// 		lat: req.body.lat,
		// 		lng: req.body.lng
		// 	},
		// 	address: {
		// 		line1: req.body.line1,
		// 		city: req.body.city,
		// 		state: req.body.state,
		// 		zip: req.body.zip
		// 	}
		// },
		status: 0,
		author: {
			id: user.id,
			username: user.use
		},
		contact:{
			name: post.owner,
			phone: req.contact
		},	
		dog_name: post.dog_name,
		reward: post.reward,
		size: post.size,
		color: post.color,
		coat: post.coat,
		breed: post.breed,
		tag_id: post.tag_id,
		description: post.note
	}); 
	console.log(newPosting);
	newPosting.save(function(err, saved, status) {
		if (err) { console.log(err);
			res.json({
				passFail: 0,
				status: "Error in saving a new post"
			});
		} else {
			console.log(saved);
			res.json({
				passFail: 1,
				status: "Registered!",
				docs: saved
			}); 
		}
	});
});

//Beginning of delete posting
router.post('/remove_post',function(req,res,next){
	var postId = req.body.postId;
	Posting.findByIdAndRemove(postId, function(err, docs) {
		if (err) { console.log(err);
			res.json({ passFail: 0, status: "Error in finding the post to remove"});
		} else {
			if (docs == null) {
				console.log(docs);
			} else {
				console.log("docs removed");
				res.json({
					passFail: 1,
					docs: docs
				});
			}
		}
	});
}); 

router.post('/edit_post', function(req, res, next) {
	var postId = req.body.post.id;
	var post = req.body.post;
	Posting.findOneAndUpdate({_id: postId}, {$set: {
		//location, datetime (LAST SEEN)
		contact:{
			name: post.owner,
			phone: req.contact
		},	
		dog_name: post.dog_name,
		reward: post.reward,
		size: post.size,
		color: post.color,
		coat: post.coat,
		breed: post.breed,
		tag_id: post.tag_id,
		description: post.note
	}}, {upsert: true, new: true}, function(err, docs) {
		if (err) { console.log(err);
			res.json({
				passFail: 0,
				status: "Err in editing a post"
			});
		} else {
			console.log(docs);
			res.json({
				passFail: 1,
				docs: docs
			});
		}
	});
});


// Get Listings ------------------------------------
router.post('/listing',function(req, res, next) {
	console.log('listing!');
	Posting.find({}, function(err, docs) {
		if (err) { 
			console.log(err);
			res.json({
				passFail: 0,
				status: "Error found",
				docs: err
			});
		} else {
			console.log('no err!');
			if (docs == null) {
				console.log("docs = null");
				res.json({
					passFail: 0,
					status: "docs is null",
					docs: docs
				});
			} else {
				res.json({
					passFail: 1,
					docs: docs
				});
			}
		}
	});
});

module.exports = router;
