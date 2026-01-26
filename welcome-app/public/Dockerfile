FROM nginx

COPY . /usr/share/nginx/html/

RUN chmod _R 755 /usr/share/nginx/html/

COPY . .
COPY ./nginx.conf /etc/nginx/conf.d/default.d
EXpose 80

CMD ["nginx","-g","daemon off;"]