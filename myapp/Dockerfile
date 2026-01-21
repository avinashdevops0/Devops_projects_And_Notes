FROM php:8.1-apache

# Install MySQL PDO extension and enable rewrite
RUN docker-php-ext-install pdo_mysql mysqli 
#\
# && a2enmod rewrite \
# && echo "ServerName localhost" >> /etc/apache2/apache2.conf

WORKDIR /var/www/html/myapp
COPY . .
RUN chmod -R 755 /var/www/html/myapp

# Copy your custom Apache config
COPY myapp.conf /etc/apache2/sites-available/000-default.conf

RUN chown -R www-data:www-data /var/www/html/myapp

EXPOSE 80
CMD ["apache2-foreground"]
