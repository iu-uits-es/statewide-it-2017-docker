#!/usr/bin/env bash

docker stack rm todoapp

docker swarm leave -f

rm ~/projects/statewide-iu-2017-docker/Dockerfile
rm ~/projects/statewide-iu-2017-docker/docker-stack.yml

docker pull jwbennet/todoapp-java:mysql
