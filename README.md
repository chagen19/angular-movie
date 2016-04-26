angular-movies
==============

Angular movie app with nodejs and mongo.

Requirements
1. node-movie project

Setup
1. Install bower dependencies
    $ bower install
2. Install npm dependencies
    $ npm install
3. Start node-movies (from base node-movies folder)
    $ ./bin/www
4. Run tomcat docker (from base node-movies folder)
    $ docker run -d -p <local port>:80 --name <container name> -v "$PWD":/usr/local/apache2/htdocs/ httpd:2.4
5. Open in browser at http://localhost/app/#/
