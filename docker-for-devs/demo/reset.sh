#!/usr/bin/env bash

docker stack rm todoapp

docker swarm leave -f

rm ~/projects/statewide-it-2017-docker/java/.dockerignore
rm ~/projects/statewide-it-2017-docker/java/Dockerfile
rm ~/projects/statewide-iu-2017-docker/java/docker-stack.yml

docker pull jwbennet/todoapp-java:mysql
