var express = require('express');
var router = express.Router();
var util = require('util');
var $ = require('jquery');

router.get('/', function(req,res,next){
	console.log('serving /');
	if(!res.locals.partials){
		res.locals.partials = {};
	}
	jsonArray=[];
	jsonData = {};
	sql = req.sql;
	sql.connect(req.LynxDBconfig).then(function(){
	        new sql.Request().query('select * from view_Outbound').then(function(recordset){
			console.dir(recordset);
			jsonArray['trucks'] = recordset;
			//res.locals.partials.outboundContext = getOutboundDocs();
			res.locals.partials.outboundContext = jsonArray;
			res.render('outbound',{helpers:{foo: function(){return jsonArray;}}});
		}).catch(function(err){
			console.log('Error while running sql in outbound : ' + err);
		});
	});
});


module.exports = router;
