/****************************************************************
 Get user details form the database
*****************************************************************/

const handelProfileGet = (req , res, knex) =>{
	//Get Uset ID from site
	const { id } = req.params;	
	//select form user table where ID = to id field 
	knex.select('*').from('users').where({
		id : id
	})
	//return user info or error if not found
	.then(user => {
		if(user.length){
			res.json(user[0]);	
		} else{
			res.status(400).json('Not Found');
		}		
	}).catch(err => res.status(400).json('Error getting user'));
}

module.exports = {
	handelProfileGet 
}