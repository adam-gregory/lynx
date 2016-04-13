var express = require('express');
var router = express.Router();
var sql = require('mssql');

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.response("error!");
});

router.get('/getOutbound', function(req,res,next){
        sql = req.sql;
	console.log(req.LynxDBconfig);
	sql.connect(req.LynxDBconfig).then(function(){
	        new sql.Request().query('select * from Outbound').then(function(recordset){
			console.log('after the select');
			res.json(recordset);
		}).catch(function(err){
			res.json("An error occured while selecting outbound : " + err);
		});
	});
});

router.post('/createOutbound', function(req, res,next){
 	console.log(req.body.Item);
	res.json(req.body);		
});

module.exports = router;
