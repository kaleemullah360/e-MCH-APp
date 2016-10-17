#! /bin/sh
################################################################################
# 1. This script install Node Js version 6.                                    #
# 2. Install & setup other project Packages                                    #
#                                                                              #
# Warning:                                                                     #
#  Run this script once only. running it again will re-install/update existing #
#  installations.                                                              #
#                                                                              #
# Written By:                                                                  #
#  Kaleem Ullah <mscs14059@itu.edu.pk> <kaleemullah360@live.com>               #
################################################################################

# Download & Setup Node Js 6
read -p "Want me to setup Node-Js? (y/n)" -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
	curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
	sudo apt-get install -y nodejs
	echo "Node Js Succefully Installed."
    #exit 1
fi

# Install coap library
read -p "Want me to setup coap? (y/n)" -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
	npm install coap --save
	    #exit 1
fi

# Install ping library
read -p "Want me to setup net-ping? (y/n)" -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
	npm install net-ping
	    #exit 1
fi

# Install Project Packages
read -p "Want me to npm install? (y/n)" -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
	npm install
	    #exit 1
fi

read -p "Want me to setup node-red? (y/n)" -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
	sudo npm install -g node-red
	sudo npm install -g i18next
	echo "to start/run node-red: node-red"
	echo ""
	echo "To open Node-Red use: http://localhost:1880"
    #exit 1
fi

exit 1
