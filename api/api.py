#!/usr/bin/env python
#coding=utf-8

import tornado.web
import tornado.httpserver


app = tornado.web.Application([
    (r"/",TestHandler)
])

http_server = tornado.httpserver.HTTPServer(app)
http_server.listen(8080)
print "start at 8080"
tornado.ioloop.IOLoop.instance().start()
