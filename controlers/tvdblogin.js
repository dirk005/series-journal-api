const handelTvDbLogin = (req , res , request) =>{
	var headers = {
	    'Content-Type': 'application/json',
	    'Accept': 'application/json'
	};

	var dataString = `{
	"apikey" : "6IRSO76GZPTPQ0U8",
	"userkey" : "EPUUU79RZ0JT31IM",
	"username": "dirkvanrensburg5o1b"}`;

	var options = {
	    url: 'https://api.thetvdb.com/login',
	    method: 'POST',
	    headers: headers,
	    body: dataString
	};

	const callback = (error, response, body) => {
	    if (!error && response.statusCode == 200) {
	        res.json(body);			
	    }else(
	    	res.status(400).json('error')
	    )
	}
	request(options, callback);	
	
}

module.exports = {
	handelTvDbLogin 
}

// fetch('https://api.thetvdb.com/login', { 
	// 			method : 'POST',
	// 			headers: { Accept: "application/json", "Content-Type": "application/json" },
	// 			body : JSON.stringify(userDetail)
	// 		})
	// 	.then(response => res.json(response))
	// 	.catch(err => res.json(err))
		 //.then(token => res.json(token))
