#! /bin/sh
################################################################################
# 1. This script remove Mysql v 5.7 along with all dependacies.                #
# 2. Install & setup Mysql server 											   #	
# 3. The script also change password for MySql server and set Abcd1234         #
#                                                                              #
# Warning:                                                                     #
#  Run this script once only. running it again will re-install/update existing #
#  installations.                                                              #
#                                                                              #
# Written By:                                                                  #
#  Kaleem Ullah <mscs14059@itu.edu.pk> <kaleemullah360@live.com>               #
################################################################################

#@First choose the database:
#@
#@mysql>use mysql;
#@
#@And then show the tables:
#@
#@mysql>show tables;
#@
#@You will find the user table, now let's see its fields:
#@
#@mysql> describe user;

read -p "completetly remove mysql server 5.7? (y/n)" -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then

	sudo service mysql stop  #or mysqld
	sudo killall -9 mysql
	sudo killall -9 mysqld
	sudo apt-get remove --purge mysql-server mysql-client mysql-common
	sudo apt-get autoremove
	sudo apt-get autoclean
	sudo deluser mysql
	sudo rm -rf /var/lib/mysql
	sudo apt-get purge mysql-server-core-5.7
	sudo apt-get purge mysql-client-core-5.7
	sudo rm -rf /var/log/mysql
	sudo rm -rf /etc/mysql
	echo "mysql server successfully removed. you can re-install it."
    #exit 1
fi

read -p "Install mysql server 5.7? (y/n)" -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then

	sudo apt-get install mysql-server
	echo "mysql server successfully install."
    #exit 1
fi

read -p "Want me to set permission 777? (y/n)" -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then

	sudo chmod -R 777
	echo "permission 777 successfully set."
    #exit 1
fi
