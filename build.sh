#!/bin/sh

docker buildx build --platform linux/amd64 -t uportal/todo-angular -f Dockerfile .
