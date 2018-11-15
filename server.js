/****************************************************************
 This is the main server to connecect to the site 
*****************************************************************/

const express = require('express');
const bodyParser =require('body-parser');
const bcrypt =require('bcrypt-nodejs');
const cors = require('cors');
const register = require('./controlers/register.js');
const signin = require('./controlers/signin.js');
const tvdblogin = require('./controlers/tvdblogin.js');
const refreshToken = require('./controlers/refreshToken.js');
const seriesSearch = require('./controlers/seriesSearch.js');
const getSeries = require('./controlers/getSeries.js');
const getSeriesSeason = require('./controlers/getSeriesSeason.js');
const getSeriesEpisodes = require('./controlers/getSeriesEpisodes.js');
var request = require('request');

// setup coneccting to database details
const knex = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'dirk',
    password : 'dirk',
    database : 'series'
  }
  // connection: {
  //   connectionString  : 'postgresql-rigid-28132', //process.env.DATABASE_URL,
  //   ssl: true,
  // }
});

//setup app and add bodyParser and cors to app
const app = express();
app.use(bodyParser.json());
app.use(cors());

//default page to see if server is working
app.get('/',(req, res ) => res.send('it is working'))
//handel the sign in 
app.post('/signin', (req , res ) => {signin.handleSignin(req , res , knex ,bcrypt)})
//handel the register
app.post('/register',(req,res) => { register.handleRegister( req , res , knex , bcrypt)})
//handel the login to the TV DB and gets Auth key
app.get('/tvdblogin', (req , res ) => {tvdblogin.handelTvDbLogin(req , res ,request )})
//Refresh the Auth key
app.post('/refreshToken', (req , res ) => {refreshToken.handelRefreshToken(req , res ,request )})
//search series by sending a name to The TV DB
app.post('/seriesSearch', (req , res ) => {seriesSearch.handelSeriesSearch(req , res ,request )})
//Gets series detail by series ID
app.post('/getSeries', (req , res ) => {getSeries.handelGetSeries(req , res ,request )})
//Gets series seasons by series ID
app.post('/getSeriesSeason', (req , res ) => {getSeriesSeason.handelGetSeriesSeasons(req , res ,request )})
//Gets series episodes by series ID
app.post('/getSeriesEpisodes', (req , res ) => {getSeriesEpisodes.handelGetSeriesEpisodes(req , res ,request )})
//Gets user details form the database
app.get('/profile/:id', (req ,res) => {profile.handelProfileGet(req,res,knex)})

//listens to port to see if conneted
app.listen(process.env.PORT || 3001, () => {
	console.log(`App is running on port ${process.env.PORT}`);
})