# TwitMore Node Server

INSTALL THE FOLLOWING MODULES AS EC2-USER

To Install NVM, Node on a AWS Linux 2 AMI
```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install --lts
nvm alias default 10.15.3
```
To Install:
```
npm install -g nodemon
npm install express --save
```

To Install Puppeteer
```
npm i puppeteer
yum install pango.x86_64 libXcomposite.x86_64 libXcursor.x86_64 libXdamage.x86_64 libXext.x86_64 libXi.x86_64 libXtst.x86_64 cups-libs.x86_64 libXScrnSaver.x86_64 libXrandr.x86_64 GConf2.x86_64 alsa-lib.x86_64 atk.x86_64 gtk3.x86_64 ipa-gothic-fonts xorg-x11-fonts-100dpi xorg-x11-fonts-75dpi xorg-x11-utils xorg-x11-fonts-cyrillic xorg-x11-fonts-Type1 xorg-x11-fonts-misc -y
```

To Install Database
```
sudo yum install mariadb-server
mysql -u root
mysql> create database autoTweets
mysql> source dump.sql
```

To Run

```
./run.command
```
