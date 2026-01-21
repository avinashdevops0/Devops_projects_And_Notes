
## Deployment Instructions:

### **For Apache (cPanel/shared hosting):**
1. Upload all files to public_html (or htdocs)
2. Ensure `.htaccess` is uploaded
3. Create database via cPanel
4. Update `config/database.php` with your credentials
5. Set permissions: `chmod 644 config/database.php`

### **For Nginx:**
Create this configuration in `/etc/nginx/sites-available/myapp`:
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/myapp;
    index index.php;

    location / {
        try_files $uri $uri/ /index.php?$args;
    }

    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}