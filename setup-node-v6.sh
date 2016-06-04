#! /bin/sh
################################################################################
# 1. This script install Node Js version 6.									   #
# 2. Install & setup other project Packages 								   #
################################################################################

# Download & Setup Node Js 6
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install coap library
npm install coap --save

# Install Project Packages
npm install