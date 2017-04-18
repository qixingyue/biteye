#coding=utf-8

import Base
import Util

@Base.RestMethod
class Sample(Base.RestBaseHandler):

    __url__ = '/'

    def get(self):
        #self.echo_error("Bad Request!")
        self.echo_message("This is biteye api server , X !")

@Base.RestMethod
class Login(Base.RestBaseHandler):

    __url__ = '/api/login'

    def post(self):
        u = self.get_argument('u','')
        p = self.get_argument('p','')

        if u == 'biteye' and p == 'biteye':
            token = Util.MD5(u+p)
            obj = {"login":True,'token':token}
            self.echo_message(obj)
        else :
            obj = {"login":False,'message':"用户名或密码错误!"}
            self.echo_message(obj)
