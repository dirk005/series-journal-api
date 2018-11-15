/****************************************************************
 Register user on the database
*****************************************************************/

const handleRegister = (req,res, knex ,bcrypt) =>{
	//get input details form site
	const { email ,password, name} = req.body;
	//check if all userdetails is entered
	if (!email || !name || !password){
		return res.status(400).json('incorrect form submision');
	}
	//add incription to passowrd
	const hash = bcrypt.hashSync(password);

	//try to add to the database
	knex.transaction(trx => {
		//add password and email to login table
		trx.insert({
			hash : hash,
			email : email
		})
		.into('login')
		.returning('email')
		//add user details to user table
		.then(loginEmail => {
			return trx('users')
				.returning('*')
				.insert({
					email: loginEmail[0],
					name:name,
					joined: new Date()
				})
				//respond with userdetails
				.then( user =>{
				res.json(user[0]);
			})
		})
		//if seccesful commit transaction 
		.then(trx.commit)
		//if failed don't update
		.catch(trx.rollback)
	})
	//if there was a error throw error
	.catch(err => res.status(400).json('Unable to register'));		
}

module.exports ={
	handleRegister
};