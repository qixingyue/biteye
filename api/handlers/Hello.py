#coding=utf-8

import Base


@Base.RestMethod
class Hello(Base.RestBaseHandler):
    __url__ = "/"

    def get(self):
        self.write("Ok , Bye")


