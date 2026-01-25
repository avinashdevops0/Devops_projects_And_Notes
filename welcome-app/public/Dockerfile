FROM nginx

COPY . /usr/share/nginx/html/

RUN chmod _R 755 /usr/share/nginx/html/

COPY . .

CMD ["nginx","-g","daemon off;"]