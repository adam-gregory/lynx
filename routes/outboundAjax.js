var express = require('express');
var router = express.Router();
var util = require('util');
var $ = require('jquery');


router.get('/:id', function(req,res,next){
	var outboundid = res.params.id;
	res.render('outboundAjax',outboundid);	
});

module.exports = router;
