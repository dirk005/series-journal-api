const express = require('express');
const bodyParser =require('body-parser');
const bcrypt =require('bcrypt-nodejs');
const cors = require('cors');
const register = require('./controlers/register.js');
const signin = require('./controlers/signin.js');


// connect 
const knex = require('knex')({
  client: 'pg',
  connection: {
    connectionString  : 'postgresql-rigid-28132', //process.env.DATABASE_URL,
    ssl: true,
  }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/',(req, res ) => res.send('it is working'))
app.post('/signin', (req , res ) => {signin.handleSignin(req , res , knex ,bcrypt)})
app.post('/register',(req,res) => { register.handleRegister( req , res , knex , bcrypt)})
app.get('/profile/:id', (req ,res) => {profile.handelProfileGet(req,res,knex)})


app.listen(process.env.PORT || 3001, () => {
	console.log(`App is running on port ${process.env.PORT}`);
})