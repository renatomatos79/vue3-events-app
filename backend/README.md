# my-vue-app

```sh
docker run --name redisserver -d -p 6379:6379 redis
docker image build -t rcm-events-backend:1.0.3 .
docker container run -d --name rcm-events-backend -p 8082:80 rcm-events-backend:1.0.3
```
