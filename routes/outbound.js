var express = require('express');
var router = express.Router();


function getOutboundDocs()
{
	
	return{
		trucks:[
			{
				trucknum: '42',
				itemid: 'XYZ',
				qty: '10000',
				address: '1234 Front St. 45555'
			},{
				trucknum: '3.14159',
				itemid: 'ABC',
				qty: '14000',
				address: '10.109.10.214'
			},

		]
	};		
}


router.get('/', function(req,res,next){
	if(!res.locals.partials){
		res.locals.partials = {};
	}
	res.locals.partials.outboundContext = getOutboundDocs();
	res.render('outbound',null);
});

module.exports = router;
