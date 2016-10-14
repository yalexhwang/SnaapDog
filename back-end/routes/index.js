var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var mongoCreds = require('../config/mongoCreds');
var User = require('../models/user');
var Entry = require('../models/stray_entry');
var Posting = require('../models/posting');

//Replace it with your name .yourname
mongoose.connect('mongodb://' + mongoCreds.username + ':' + mongoCreds.password + '@ds057476.mlab.com:57476/snaap_dog');

var bcrpyt = require('bcrpyt-nodejs');
var randToken = require('rand-token');

router.get('/', function(req, res, next) {
	console.log("hahahahahaha");
  res.render('index', { title: 'Express' });
});


// Register router
router.post('/register',function(req,res,next){
	console.log("working");
	var username = req.body.username;
	var pw = req.body.password;
	var email = req.body.email;
	console.log(username);
	console.log(pw);
	console.log(email);
	res.json({
		username: username,
		password: pw,
		email: email
	});
	// User.findOne({ username:req.body.username },
	// 	function (error, document){
	// 		if(document==null){
	// 			res.json({failure:'badToken'})
	// 		}else{
	// 			console.log("document returned");
	// 			console.log(document);
	// 		}
	// });
	// if(req.body.password != req.body.confirmPassword){
	// 	res.json({
	// 		message: "passmatch"
	// 	});
	// }else{
	// 	var token=randToken(32);
	// 	var newUser = new User({
	// 		username: req.body.username,
	// 		password: bcrypt.hashSync(req.body.password),
	// 		email: req.body.email,
	// 		token:token
	// 		//add token exp date
	// 	});


	newUser.save(function(error,documentAdded){
			if(error){
				res.json({
					message:"errorAdding"
				});
			}else{

				res.json({
				message: "added",
				token:token
			});
			}
		});
});

module.exports = router;
