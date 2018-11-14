/****************************************************************
 Sign in to app by getting user info form database
*****************************************************************/

const handleSignin = (req , res ,knex ,bcrypt) =>{
	//gets email and password from user input
	const { email , password} = req.body;

	//check if valid entry
	if (!email || !password){
		return res.status(400).json('incorrect form submision');
	}
	//Gets login details from database using knex
	knex.select('email', 'hash').from('login')
	.where( 'email', '=', email)
	.then(data => {
		//checks bcrypt if password matches the one on the database 
		const isValid = bcrypt.compareSync(password,data[0].hash);
		if (isValid ){
			//selects user and returns user info
			return knex.select('*').from('users')
			.where('email', '=' , email)
			.then(user =>{				
				res.json(user[0])
			})
			//returns error if something went wrong getting user form database
			.catch(err => res.status(400).json('Unable to get user'))
		} else{
			//returns error if user details is incorect
			res.status(400).json('Wrong credentials')
		}
	})	
	//returns error if something went wrong connecting to database
	.catch(err => res.status(400).json('Unable to get user'))
}

module.exports ={
	handleSignin 
}