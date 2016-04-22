var express = require('express');
var router = express.Router();
var phantom = require('phantom');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Lynx Deliver Route' });
});


/*This route will generate a pdf and download it. It will use the page in the next route /BOL as it's bases for the pdf*/
router.get('/BOLFile', function(req, res, next){
	
	console.log('creating Phantom Object and rendering Page');
	phantom.create()
	.then(function(ph){
		ph.createPage()
		.then(function(page){
			console.log('about to open page');
			page.open('http://10.109.10.232:3000/bol.html')
			.then(function(status){
				try
				{
				
					page.render('/home/agregory/lynx/public/bol.pdf');
					page.close();
					ph.exit();
				}
				catch(err)
				{
					console.log(err);
				}
				
				res.download('/home/agregory/lynx/public/bol.pdf','file:///bol.pdf', 
					function(err){
						if(err){
							console.log(err);
						}
						else{
							console.log('should be good to go');
						}					
					});
			});
		});
	});
});

/*This generates a html representation of the BOL used to view the BOL and for generating the PDF for printing and saving*/
router.get('/BOL/:id', function(req, res, next){
	var outboundID = req.params.id;
	console.log('got a request to view the bol for outbound:' + outboundID);
	try
	{
		res.render('BOL',{layout:null, outboundID});
	}catch(err)
	{
		console.log(err);
	}
});
module.exports = router;
