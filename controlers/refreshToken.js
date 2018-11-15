/****************************************************************
refresh API Auth key Token
*****************************************************************/

const handelRefreshToken = (req , res , request) =>{

	//get old auth key from body
	const { authKey} = req.body;

	//setup headers to send to API
	var headers = {
	    'Accept': 'application/json',
	    'Authorization': `Bearer ${authKey}`
	};

	//setup options to send to API
	var options = {
	    url: 'https://api.thetvdb.com/refresh_token',
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
	handelRefreshToken 
}

