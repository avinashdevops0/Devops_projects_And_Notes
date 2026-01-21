FROM php:8.1-apache

# Enable Apache modules
RUN a2enmod rewrite \
 && echo "ServerName localhost" >> /etc/apache2/apache2.conf

# Set working directory
WORKDIR /var/www/html/myapp

# Copy app files
COPY . .

# Copy your custom Apache config
COPY myapp.conf /etc/apache2/sites-available/000-default.conf

# Fix permissions
RUN chown -R www-data:www-data /var/www/html/myapp

# Expose HTTP
EXPOSE 80

CMD ["apache2-foreground"]
