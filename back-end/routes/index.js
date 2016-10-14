var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var mongoCreds = require('./cred.json');
var User = require('../models/user');
var Entry = require('../models/stray_entry');
var Posting = require('../models/posting');

//Replace it with your name .yourname
mongoose.connect(configVar.summer);

var bcrpyt = require('bcrpyt-nodejs');
var randToken = require('rand-token');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// Register router
router.post('/register',function(req,res,next){
	User.findOne(
		username:req.body.username
		},
		function (error, document){
			if(document==null){
				res.json({failure:'badToken'})
			}else{

			}

		
});
	if(req.body.password != req.body.confirmPassword){
		res.json({
			message: "passmatch"
		});
	}else{
		var token=randToken(32);
		var newUser = new User({
			username: req.body.username,
			password: bcrypt.hashSync(req.body.password),
			email: req.body.email,
			token:token
			//add token exp date
		});


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
		
	}
}); //end of register router

// Login router
router.post('/login',function(req,res,next){
	User.findOne{
		username:req.body.username
		},
		function(error,document){
			if(){
				//if username doesnt exist at all

			}else{
				//if username was found hash the entered password anc check it against DB password
				var passwordCheck=bcrypt.compareSync(req.body.password, document.password);
				var token = randToken(32);
				var date = Date.now();
				var tokenExpDate = date + (30);

				//if passwordCheck matches password
				if(passwordCheck){

					//The password is correct. Log them in.
					User.update({username: document.username}).exec();
						// ,{token: token, tokenExpDate: tokenExpDate})
					res.json({
						success:"userFound",
						username:document.username,
						// token:token,
						// tokenExpDate:tokenExpDate
					});

			}else{
			//if pass word hash did not math DB password
					res.json({
						failure: "badPass"
					});
				}
		}
	}

}) //end of login router

//Beginning of Posting 
router.post('/posting',function(req,res,next){
	//if user logged in
	//bring up being able to add more than one post per user for a time period
	User.findOne{
		username:req.body.username
		},
		function(error,document){
			if(error){
				console.log("Error in finding user in posting")
			}else{

				var newPosting=new Posting({
					photo:req.body.photo,
					location: //find out how this would be done in backend,
					address: //figoure out how to do address,
					status:req.body.status,
					contact://same with contact,
					dog_name:req.body.dog_name,
					reward:req.body.reward,
					size:req.body.size,
					color:req.body.color,
					hair:req.body.hair,
					breed:req.body.breed,
					tag_id:req.body.tag_id,
					description:req.body.description
				} // end of var newPosting
			}
				newPosting.save()

		} //end of posting function 

}); //end of Posting 

//Beginning of delete posting
router.get('/deletePost',function(req,res,next){
	Posting.find()
		.then function(document){
			res.render({'posting',title:'Express'})
		}

}); //end of delete posting


//Beginning of update post
router.post('updatePosting',function(req,res,next){
	User.findOne{
		id:req.body.id
	}

	function(error,document){
		if(error){
			console.log("error in updatePosting")

		}else{
			document.photo:req.body.photo;
			document.location: //find out how this would be done in backend,
			document.address: //figoure out how to do address,
			document.status:req.body.status;
			document.contact://same with contact,
			document.dog_name:req.body.dog_name;
			document.reward:req.body.reward;
			document.size:req.body.size;
			document.color:req.body.color;
			document.hair:req.body.hair;
			document.breed:req.body.breed;
			document.tag_id:req.body.tag_id;
			document.description:req.body.description;
			document.save();
		}
	}
})

//Beginning of shelter listing

//Beginning of personal post lisitng
router.get('/personalPosts',function(res,req,next){
	
})
//Beginning of lostList 
//This pulls from database to display all the postings of dogs
router.get('/lostList',function(req,res,next){
	Posting.find(
		 .then function(document){
		 	res.render({'posting',title:'Express'});
		 }
	
}); //end of lost list 

module.exports = router;
