#!/bin/bash
# This script is used to create virtual hosts.

if [ $(id -u) != "0" ]; then
    echo "You must be the superuser to run this script (Type sudo bash apache2.sh)" >&2
    exit 1
fi

echo "Enter the home directory to project (/home/woow/GuessWord/GuessWordFront)"
read homedir

# Create a directory for your apache errors log
mkdir /var/log/apache2/guessword/

# Creation the file with VirtualHost configuration in /etc/apache2/site-available/
echo "<VirtualHost *:80>
        ServerAdmin guestword@localhost
        ServerName guessword
        ServerAlias guessword.com www.guessword.com
 
        DocumentRoot $homedir
        <Directory />
                Options FollowSymLinks
                AllowOverride All
        </Directory>
        <Directory $homedir>
                Options Indexes FollowSymLinks MultiViews
                AllowOverride All
                Order allow,deny
                allow from all
        </Directory>

        ScriptAlias /cgi-bin/ /usr/lib/cgi-bin/
        <Directory "'/usr/lib/cgi-bin'">
                AllowOverride All
                Options +ExecCGI -MultiViews +SymLinksIfOwnerMatch
                Order allow,deny
                Allow from all
        </Directory>

        ErrorLog /var/log/apache2/guessword/error.log

        # Possible values include: debug, info, notice, warn, error, crit,
        # alert, emerg.
        LogLevel warn

        CustomLog /var/log/apache2/$sn/access.log combined

    Alias /doc/ "'/usr/share/doc/'"
    <Directory "'/usr/share/doc/'">
        Options Indexes MultiViews FollowSymLinks
        AllowOverride All
        Order deny,allow
        Deny from all
        Allow from 127.0.0.0/255.0.0.0 ::1/128
    </Directory>

</VirtualHost>" > /etc/apache2/sites-available/GuessWordFront

# Add the host to the hosts file
echo 127.0.0.1 guessword.com www.guessword.com >> /etc/hosts

# Add the host to httpd.conf
echo ServerName guessword >> /etc/apache2/httpd.conf

# Enable the site
a2ensite GuessWordFront

# Reload Apache2
service apache2 reload

echo "Now u can start project with guessword.com  or www.guessword.com"
exit 0
