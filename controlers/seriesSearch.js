const handelSeriesSearch = (req , res , request) =>{

	const { authKey,searchTerm} = req.body;

	var request = require('request');

	var headers = {
	    'Accept': 'application/json',
	    'Authorization': `Bearer ${authKey}`
	};

	var options = {
	    url: `https://api.thetvdb.com/search/series?name=${searchTerm}`,
	    headers: headers
	};

	function callback(error, response, body) {
	  	 if (!error && response.statusCode == 200) {
	        res.json(body);
	    }else if(!error && response.statusCode === 404){
	    	res.json('404')
	    }
	    else {
	    	request(options, callback); // try again
	    	//res.json('error')
	    }
	}

	request(options, callback);
}
module.exports = {
	handelSeriesSearch 
}