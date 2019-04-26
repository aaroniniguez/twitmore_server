const log = require("why-is-node-running")
const mysql = require("mysql");
const twitter = require("twitter");
var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	database: "autoTweets"
});
con.connect(function(err){
	if(err) throw err;	
	console.log("connected to db");
});
//get all tweet info
var currentTime = new Date();
con.query("select * from tweets", function(err, result){
	if(err){
		console.log(err);
		return;
	}
	(async function postTweets(){
		console.log(result);
		for(let element of result){
			var difference = currentTime - element.start_time;
			var daysDif = Math.floor(difference/1000/60/60/24);
			var hoursDif = Math.floor(difference/1000/60/60);
			//if(daysDif && daysDif % element.days === 0 && hoursDif && hoursDif % element.hours === 0 && currentTime.getMinutes() === element.minutes){
			if(true)
			{
				await twitter.postOnTwitter(element.username, element.password, element.tweet, uploadFile = false, randomFollow = false).catch(function(error){
					if(error) console.log(error);
				});
			}
		}
		con.end(function(err){
			if(err) console.log(err);	
		});
		setTimeout(function(){
			log();
			process.exit();
		}, 2000);
	})();
});
