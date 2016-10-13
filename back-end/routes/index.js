var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var mongoCreds = require('./cred.json');
var User = require('../models/user');
var Entry = require('../models/stray_entry');
var Posting = require('../models/posting');

//Replace it with your name .yourname
mongoose.connect(configVar.alex);

var bcrpyt = require('bcrpyt-nodejs');
var randToken = require('rand-token');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
