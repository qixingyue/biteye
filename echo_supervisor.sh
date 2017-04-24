#/bin/bash

p=$(pwd)

echo "
[program:biteye]
command=python -u ${p}/api/api.py
user = root
autostart = true
autorestart = true
startsecs = 10
stderr_logfile = ${p}/logs/api_stderr.log
stdout_logfile=${p}/logs/api_stdout.log
"
