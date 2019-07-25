const express = require('express'); // Express object
const cors = require('cors'); // setup Cross Origin Resource Sharing
const logger = require('morgan'); // monitor http requests in terminal
const bodyParser = require('body-parser'); //grab form request body
const mongoose = require('mongoose'); //mongoose mongodb database models

require('dotenv').config(); // parse .env file to get configs

//Connect Database
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify:false
})
.then(
    () => { console.log('Mongo Connected.!') },
    err => { /** handle initial connection error */ console.log(err) }
);

//Initialize App
const app = express();

//Import Routes
const apiRoutes =  require('./routes/api');

//Middlewares
app.use(cors());
app.use(logger('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.get('/',(req,res)=>{
	res.status(200).json({
		message:"Welcome to Express MongoDB App"
	})
});

//Register Routes
app.use('/api',apiRoutes);


app.listen(process.env.PORT, () =>{
	console.log("App Listening on "+process.env.PORT)
});
