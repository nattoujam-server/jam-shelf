#!/bin/sh

git pull origin main
sudo docker build -t jam-shelf-f --target runtime-web --network=host .
sudo docker build -t jam-shelf-b --target runtime-api --network=host .

sudo docker stop jam-shelf-web
sudo docker stop jam-shelf-api

sudo docker rm jam-shelf-web
sudo docker rm jam-shelf-api

sudo docker run --name jam-shelf-web -d -p 15080:80 jam-shelf-f:latest
sudo docker run \
  --name jam-shelf-api \
  -d \
  -p 15500:5000 \
  --mount type=volume,src=jam-shelf-db,dst=/app/packages/database/prisma \
  jam-shelf-b:latest
