/***************************************************************
this code replaces the fetch statment to get the retful API data
****************************************************************/

const handelTvDbLogin = (req , res , request) =>{
	// setup header
	var headers = {
	    'Content-Type': 'application/json',
	    'Accept': 'application/json'
	};

	// setup data to send to the API
	var dataString = `{
	"apikey" : "6IRSO76GZPTPQ0U8",
	"userkey" : "EPUUU79RZ0JT31IM",
	"username": "dirkvanrensburg5o1b"}`;

	// setup options for the API
	var options = {
	    url: 'https://api.thetvdb.com/login',
	    method: 'POST',
	    headers: headers,
	    body: dataString
	};

	// get the response and send it back to main site
	const callback = (error, response, body) => {		
	    if (!error && response.statusCode == 200) {
	        res.json(body);			
	    }else if(!error && response.statusCode === 404){
	    	res.json('404')
	    }else{
	    		//res.json('error')
	    		request(options, callback); // try again
	    	
	    }
	}

	

	// use npm package request to get the API response send options and callback resevese response
	request(options, callback);	
	
}

module.exports = {
	handelTvDbLogin 
}