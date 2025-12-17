FROM nginx:1.19.6
COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY docker/redirects.conf /etc/nginx/redirects.conf
COPY ./build /usr/share/nginx/html
