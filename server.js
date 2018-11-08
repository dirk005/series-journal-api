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
var request = require('request');

// connect 
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

const app = express();
app.use(bodyParser.json());
app.use(cors());


app.get('/',(req, res ) => res.send('it is working'))
app.post('/signin', (req , res ) => {signin.handleSignin(req , res , knex ,bcrypt)})
app.post('/register',(req,res) => { register.handleRegister( req , res , knex , bcrypt)})
app.get('/tvdblogin', (req , res ) => {tvdblogin.handelTvDbLogin(req , res ,request )})
app.post('/refreshToken', (req , res ) => {refreshToken.handelRefreshToken(req , res ,request )})
app.post('/seriesSearch', (req , res ) => {seriesSearch.handelSeriesSearch(req , res ,request )})
app.post('/getSeries', (req , res ) => {getSeries.handelGetSeries(req , res ,request )})
app.get('/profile/:id', (req ,res) => {profile.handelProfileGet(req,res,knex)})


app.listen(process.env.PORT || 3001, () => {
	console.log(`App is running on port ${process.env.PORT}`);
})