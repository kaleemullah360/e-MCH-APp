run:
	sudo npm start

clean:
	rm -f *.exe

clean-all: 
	rm -f *.o
	rm -f *.exe

view-project:
	firefox https://github.com/kaleemullah360/e-MCH-APp &

view-profile:
	firefox https://github.com/kaleemullah360 &

ifeq ($(m),)
 m = 'updates'
endif

push:
ifeq ($(USER),root)
	@echo "root user, will not push to repository, try with standard user"
else
	@#	make commit m="Added-some-test"
	@echo "Current USER: $(USER)"	
	git add -A
	git commit -m $(m)
	git push origin master
endif

pull:
	git pull origin master

setup-project:
	sudo bash ./runonce.sh

mysql-fix:
	@echo "Fix < client does not support authentication protocol requested by server; consider upgrading MySQL client > error"
	@echo 
	@echo "sudo mysql --user=root mysql"
	@echo "use mysql;"
	@echo "show tables;"
	@echo "describe user;"
	@echo "use mysql;"
	@echo "update user set authentication_string=password(''), plugin='mysql_native_password' where user='root';"
	@echo "sudo service mysql restart"
	@firefox https://github.com/mysqljs/mysql/issues/1574#issuecomment-260563863

mysql-change-password:
	@echo "Change MySQL Root User password to Abcd1234"
	@echo 
	@echo "mysqld_safe --skip-grant-tables"
	@echo "mysql --user=root mysql"
	@echo "use mysql"
	@echo "show tables"
	@echo "describe user"
	@echo "update user set authentication_string=password('Abcd1234') where user='root'"

mysql-remove:
	@echo "Completly remove MySQL Server"
	@echo 
	@echo "sudo service mysql stop  #or mysqld"
	@echo "sudo killall -9 mysql"
	@echo "sudo killall -9 mysqld"
	@echo "sudo apt-get remove --purge mysql-server mysql-client mysql-common"
	@echo "sudo apt-get autoremove"
	@echo "sudo apt-get autoclean"
	@echo "sudo deluser mysql"
	@echo "sudo rm -rf /var/lib/mysql"
	@echo "sudo apt-get purge mysql-server-core-5.7"
	@echo "sudo apt-get purge mysql-client-core-5.7"
	@echo "sudo rm -rf /var/log/mysql"
	@echo "sudo rm -rf /etc/mysql"