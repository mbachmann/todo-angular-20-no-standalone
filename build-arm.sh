#!/bin/sh


docker buildx build --platform linux/arm64 -t uportal/todo-angular -f Dockerfile .
