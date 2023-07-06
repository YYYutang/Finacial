FROM 10.16.127.139:8081/bigdata_platform/nginx:latest
RUN mkdir -p /app/web
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./dist/ /app/web
RUN service nginx restart
EXPOSE 10000

