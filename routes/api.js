var express = require('express');
var router = express.Router();
var util = require('util');
var jsonArray = [];

//Returns all outbound trucks with addresses
router.get('/outboundTrucks', function(req,res,next){
	res.set('Content-Type', 'text/json');
	sql = req.sql;
	sql.connect(req.LynxDBconfig).then(function(


){
	        new sql.Request().query('select * from view_Outbound').then(function(recordset){
			res.send(recordset);
		}).catch(function(err){
			console.log('Error while running sql in outbound : ' + err);
		});
	});
});


//Returns all outboundLines for a given outboundid
router.get('/outboundLines/:outbound_id', function(req, res, next){
	res.set('Content-Type', 'text/json');
	sql = req.sql;
	var outboundID = req.params.outbound_id;
	sql.connect(req.LynxDBconfig).then(function(){
		try{
			new sql.Request()
			.input('outboundid', sql.BigInt, outboundID)
			.execute('sp_getOutboundLines', function(err, recordset, returnValue, affected){
				res.send(recordset[0]);		//should only get one recordset back from this sproc	
			});
		}catch(err){
			console.log(err);
		}		
	});
});


//deletes an outboundtruck having outboundid of outbound_id
router.delete('/outboundTruck/:outbound_id', function(req,res,next){
	sql = req.sql;
	console.log('received a request to delete', req.params.outbound_id);
	id = req.params.outbound_id;
	sql.connect(req.LynxDBconfig).then(function(){
		new sql.Request()
			.input('OutboundID', sql.BigInt, id)
			.execute('sp_deleteOutbound', function(err, recordset, returnValue, affected){
				console.log(id);
				console.log(recordset);
			});
		res.json({message:'Deleted Outbound Record with RecID:', id});
	});
});
//deletes an outbound line
router.delete('/outboundLine/:outboundLine_id', function(req,res,next){
	sql = req.sql;
	id = req.params.outboundLine_id;
	sql.connect(req.LynxDBconfig).then(function(){
		new sql.Request()
			.input('OutboundLineID', sql.BigInt, id)
			.execute('sp_deleteOutboundLine', function(err, recordset, returnValue, affected){
				res.json({message:'Deleted Outbound Line Record with RecID:', id});
			});
	});

});
//creates a new outbound header
router.post('/outbound',function(req, res, next){
	var DriverID = req.body.DriverID;
	var TruckID = req.body.TruckWHID;
	var FromWHID = req.body.FromWHID;
	var Description = req.body.Description;
	sql = req.sql;
	console.log(DriverID, TruckID, FromWHID, Description);
	sql.connect(req.LynxDBconfig).then(function(){
		new sql.Request()
			.input('DriverID', sql.NVarChar,DriverID)
			.input('TruckID', sql.NVarChar,TruckID)
			.input('FromWH', sql.NVarChar, FromWHID)
			.input('Description', sql.NVarChar, Description)
			.execute('sp_createOutbound', function(err, recordset, returnValue, affected){
				res.json({message:'Created Outbound Record with RecID:', recordset});
			});
	});
});

//creates a new outboundline
router.post('/outboundLine', function(req,res,next){
	var outboundid = req.body.outboundid;
	var itemid = req.body.itemid;
	var itemdesc = req.body.itemdesc;
	var qty = req.body.qty;
	sql = req.sql;
	sql.connect(req.LynxDBconfig).then(function(){
		new sql.Request()
			.input('outboundid', sql.BigInt,outboundid)
			.input('itemid', sql.NVarChar(20),itemid)
			.input('itemdesc', sql.NVarChar(1000), itemdesc)
			.input('qty', sql.Real, qty)
			.execute('sp_createOutboundLine', function(err, recordset, returnValue, affected){
				res.json({message:'Created Outbound Line Record with RecID:', recordset});
			});
		
	});

});

//adds a new address
router.post('/address', function(req,res,next){
	var street = req.body.street;
	var state = req.body.state;
	var number = req.body.number;
	var zip = req.body.zip;
	var name = req.body.name;
	var line3 = req.body.line3;
	var city = req.body.city;
	sql = req.sql;
	sql.connect(req.LynxDBconfig).then(function(){
		try{
		new sql.Request()
			.input('street', sql.NVarChar(50), street)
			.input('state',  sql.NVarChar(10), state)
			.input('number', sql.NVarChar(10), number)
			.input('zip',    sql.NVarChar(10), zip)
			.input('name',   sql.NVarChar(50), name)
			.input('line3',  sql.NVarChar(50), line3)
			.input('city',   sql.NVarChar(50), city)
			.execute('sp_createAddressLine',function(err, recordset, returnValue, affected){
				res.json({message:'Created Address Line Record with RecID:',affected});
			});
		}
		catch(err)
		{
			console.log(err);
		}
	});
});

module.exports = router;
