#coding=utf-8

import Base
import Util

@Base.RestMethod
class Sample(Base.RestBaseHandler):

    __url__ = '/'

    def get(self):
        #self.echo_error("Bad Request!")
        self.echo_message("This is biteye api server !")

@Base.RestMethod
class Document(Base.RestBaseHandler):

    __url__ = '/doc'

    def get(self):
        self.echo_message("Document Page.")


@Base.RestMethod
class Login(Base.RestBaseHandler):

    __url__ = '/api/login'
    __params__ = ['u','p']

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

@Base.RestMethod
class SampleQuery(Base.RestBaseHandler):

    __url__ = '/sample/query'

    def post(self):
        d = []
        for k in range(0,100):
            item = {'id':k,'name':'name'+str(k),'value':k + 100}
            d.append(item)
        i = {'have':True,'data':d}
        self.echo_message(i)


