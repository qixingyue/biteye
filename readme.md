# biteye

## some infomation

* api server:

default api server run at localhost:8080 
python api/api.py

* modify static pages running domain 

api/handlers/Base.py client_domain

* api cross domain:

api/handers/Base.py client_domain must be your client domain.

* logo:

static/text_icon.png

* static_root

static/js/first.js modify static_root , make it your own static dir

* hook function 

hooks/<html_name> is loaded no matter if exist , when hook.js is loaded .

* ./echo_supervisor.sh  

 get these supervisor config content 

* listen port

  api port define in api/api.py  <default 8080>
  page port like python -m SimpleHTTPServer default is 8000

## some pages

* [login](http://qixingyue.github.io/biteye/html/pages/login.html)
* [blank](http://qixingyue.github.io/biteye/html/pages/blank.html)
