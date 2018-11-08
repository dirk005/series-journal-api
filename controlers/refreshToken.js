const handelRefreshToken = (req , res , request) =>{

//get old auth key from body
const { authKey} = req.body;

var request = require('request');

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

//Handel response form API
function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        res.json(body);
    }else{
    	res.json('error')
    }
}

request(options, callback);
	
}
module.exports = {
	handelRefreshToken 
}

