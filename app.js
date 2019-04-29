const express = require('express'); 
const querystring = require('querystring');
const fs = require('fs');
const path = require('path');
const os = require('os');
const database = require("./Database");
const twitter = require("./twitter");
var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'w'});
var log_stdout = process.stdout;
console.log = function(d){
		var myTime = new Date();
		myTime = myTime.toString().split("GMT")[0];
		log_file.write("====" + myTime + "====\n");
	   log_file.write(util.format(d) + '\n');
	   //log_stdout.write(util.format(d) + '\n');
};
var bodyParser = require('body-parser');

//catches all errors, use this wrapper on all app.get callback func
const asyncHandler = fn =>  
    (req, res, next) =>  {   
        Promise.resolve(fn(req, res, next)).catch(function(error){   
			console.log(error);
			if(error.name == "InvalidInput" || error.name == "InvalidCredentials"){
				res.send(`{
				"type":"error",
				"message":"${error.message}"
				}`);
				res.end();
				return;
			}else{
				console.log(error);
			}
            next();
        });
    };  
	
//Define app
let app = express();
app.use(function (req, res, next) {
  console.log(req.url);
  next();
});
app.use(bodyParser.urlencoded({
	 extended: true 
}));
app.use(bodyParser.json());

//Request Endpoint
app.get('/test.php', asyncHandler(async function(req, res) {
	res.type('json');
	//Get Zone id
	res.send(`{"live":"success"}`);
	res.end();
	return;
}));
function validateString(input, message){
	if(typeof input === "undefined" || !input)
		throw {name: "InvalidInput", message: message};
}
function getNumberText(number, type) {
	var originalNumber = number;
	if(type == "minute" && originalNumber == "1")
		return "1st "+type;
	if(originalNumber == "1")
		return type;
	number = number.substring(number.length-1);
	switch (number) {
		case "0":
		case "4":
		case "5":
		case "6":
		case "7":
		case "8":
		case "9":
			return originalNumber+"th "+type;
		case "1":
			return originalNumber+"st "+type;
		case "2":
			return originalNumber+"nd "+type;
		case "3":
			return originalNumber+"rd "+type;
		default:
			return originalNumber +" "+ type;
	}
}
function getCronMessage(days, hours, minutes) {
	var message = "Tweeting on the 1st minute of every "+ getNumberText(hours, "hour") + " on every " + getNumberText(days, "day") + " on the " + getNumberText(minutes, "minute");
	console.log(message);
	return message;
}
app.post('/tweet.php', asyncHandler(async function(req, res) {
	res.type('json');
	//TODO always console log post data
	console.log(req.body);
	var password = req.body.password;
	var username = req.body.username;
	var tweet = req.body.tweet;
	var days = req.body.days;
	var hours = req.body.hours;
	var minutes = req.body.minutes;
	validateString(password, "Please set Password");
	validateString(username, "Please set Username");
	validateString(tweet, "Please set a tweet!");
	validateString(days, "Please set a days value!");
	validateString(hours, "Please set an hours value!");
	validateString(minutes, "Please set a minutes value!");
	tweet = tweet.replace(/'/g,"\\'");
	tweet = tweet.replace(/%/g, "\\%");
	tweet = tweet.replace(/\n/g, "\\n");
	//verify the users data
	await twitter.verifyLoginInfo(username, password).catch(function(error){
	if(error.name == "TimeoutError"){
		console.log(error);
		throw {name: "InvalidCredentials", message: "Invalid Credentials!"};
	}
	else
		throw error;	
	});
	database.query(`insert into tweets (username, password, tweet, days, hours, minutes) values("${username}", "${password}", "${tweet}", ${days}, ${hours}, ${minutes})`).then(() => {
			var message = getCronMessage(days, hours, minutes);
			res.send(`{
			"type":"success",
			"message": "${message}"
			}`);
			res.end();
	}).catch( err => {
		console.log(err);	
		res.send(`{
			"type":"Error",
			"message": "Database Error!"
		}`);
		res.end();
	}).finally(() => {
		console.log("running finally");
		database.close();
	});
}));

let server = app.listen(8080, function() {  
	console.log("Server is listening on port 8080");
});

