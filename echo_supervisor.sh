#/bin/bash

p=$(pwd)

echo "

[program:biteye]
command = python -u ${p}/api/tornado/api.py
user = root
autostart = true
autorestart = true
startsecs = 10
stderr_logfile = ${p}/logs/api_stderr.log
stdout_logfile = ${p}/logs/api_stdout.log
startretries = 20

[program:page]
command = python -m SimpleHTTPServer 
user = root 
autostart = true
autorestart = true
startsecs = 10
stderr_logfile = ${p}/logs/page_stderr.log
stdout_logfile = ${p}/logs/page_stdout.log
directory = ${p}/html/
startretries = 20

"
