FROM php:8.1-apache

WORKDIR /var/www/html/myapp

COPY . .

COPY ./nginx.conf //etc/nginx/sites-available/myapp.conf

CMD ["nginx","-g","daemonoff;"]