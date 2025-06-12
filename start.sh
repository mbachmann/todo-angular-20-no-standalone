#!/bin/sh

# replace static values with environment-variables
if [ -n $API_BASE_PATH ]; then
    find /usr/share/nginx/html -type f -name "*.js" -exec  sed -i "s~_API_BASE_PATH_~$API_BASE_PATH~g" {} \;
fi



nginx -g "daemon off;"
