/****************************************************************
 Search series on The TV DB and returns search results
*****************************************************************/

const handelSeriesSearch = (req , res , request) =>{
	//gets info sent form web page
	const { authKey,searchTerm} = req.body;	

	//Setup header with auth key
	var headers = {
	    'Accept': 'application/json',
	    'Authorization': `Bearer ${authKey}`
	};

	//Setup option  with headers and search term
	var options = {
	    url: `https://api.thetvdb.com/search/series?name=${searchTerm}`,
	    headers: headers
	};

	// get the response and send it back to main site
	const callback = (error, response, body) => {		
	    if (!error && response.statusCode == 200) { 
	    	// got response send back to page
	        res.json(body);			
	    }else if(!error && response.statusCode === 404){ 
	    	// send back page not found
	    	res.json('404')
	    }else{
	    	// try again by resending request
	    	request(options, callback); 	    	
	    }
	}

	// use npm package request to get the API response send options and callback resevese response
	request(options, callback);	
}
module.exports = {
	handelSeriesSearch 
}
