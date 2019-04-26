# Node Server

To Install Node on a AWS Linux 2 AMI
```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install --lts
```
To Install:
```
npm install -g nodemon
npm install express --save
sudo yum install mariadb-server
```

To Install Database
```
mysql -u root
mysql> create database autoTweets
mysql> source dump.sql
```

To Run

```
./run.command
```
