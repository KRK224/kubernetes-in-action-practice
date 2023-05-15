#!/bin/bash
trap "exit" SIGINT
INTERVAL=$1
echo Configured to generate new fortune very $INTERVAL seconds
mkdir -p /var/htdocs
while :
do
  echo $(date) Writing forturne to /var/htdocs/index.html
  /usr/games/fortune > /var/htdocs/index.html
  sleep $INTERVAL
done
