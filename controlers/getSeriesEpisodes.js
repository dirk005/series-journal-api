/****************************************************************
 Get Series details form The TV DB 
*****************************************************************/
const handelGetSeriesEpisodes = (req , res , request) =>{

	//Gets Auth key and series ID form site
	const { authKey,seriesId} = req.body;

	//setup headers
	var headers = {
	    'Accept': 'application/json',
	    'Authorization': `Bearer ${authKey}`
	};

	//setup options
	var options = {
	    url: `https://api.thetvdb.com/series/${seriesId}/episodes`,
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
	handelGetSeriesEpisodes 
}