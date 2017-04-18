#coding=utf-8

import tornado.web
import tornado.httpserver
import json

client_domain = "http://localhost:8000"

class RestBaseHandler(tornado.web.RequestHandler):

    def set_default_headers(self):
        global client_domain
        self.set_header("Access-Control-Allow-Origin", client_domain)
        self.set_header("Access-Control-Allow-Headers", "x-requested-with")
        self.set_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')

    def echo_message(self,message):
        self.json_response(True,message)

    def echo_error(self,error):
        self.json_response(False,'',error)

    def json_response(self,result,data,message=''):
        info = {
            'success':result,
            'data':data,
            'message':message
        }
        self.write(json.dumps(info))

http_server = None
application = False

def import_handlers():
    import Biteye

def RestInit(port):
    global application
    settings = {'debug':True}
    application = tornado.web.Application([],**settings)
    import_handlers()
    http_server = tornado.httpserver.HTTPServer(application)
    http_server.listen(port)
    tornado.ioloop.IOLoop.instance().start()

def RestMethod(c):
    global application
    url = c.__url__

    if False == application :
        print "NO application"
        exit()
    else :
        #add_handlers(host,[(r'url',controler)])
        application.add_handlers('.*$',[(r'%s' % (url), c)])

