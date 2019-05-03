const mysql = require("mysql")
class Database {
	constructor(){
	}
	connect(){
		var config = {
			host: "localhost",
			user: "root",
			database: "autoTweets"
		};
		this.connection = mysql.createConnection(config);
	}
	query(sql, args){
		return new Promise((resolve, reject) => {
		//need to callcreateConnection after doing end
			this.connect();
			this.connection.query(sql, args, (err, rows)=> {
				if(err) return reject(err);
				resolve(rows);
			});
		});
	}
	close(){
		return new Promise((resolve, reject) => {
			this.connection.end( err => {
				if(err) return reject(err)
				resolve();
			});
		});
	}
}
module.exports = new Database()
