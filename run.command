#force kill any existing node server running on the port
systemctl start mariadb
pkill -9 chrome
pkill -9 node
#cd to the directory this file is in
DIRECTORY=$(dirname "$0")
cd "$DIRECTORY"

#Start the node server
nohup nodemon app.js &
