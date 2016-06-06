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
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install coap library
npm install coap --save

# Install ping library
npm install net-ping

# Install Project Packages
npm install