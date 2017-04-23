#coding=utf-8

import Base
import Util
import datetime
import time

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
            if k == 30 :
                time.sleep(1)
            now = datetime.datetime.strftime(datetime.datetime.now(),"%b-%d-%y %H:%M:%S")
            item = {'id':k,'name':'name'+str(Util.RAND()),'value':Util.RAND(),'user':'biteye','time':now}
            d.append(item)
        self.echo_data(d)


@Base.RestMethod
class SampleChart(Base.RestBaseHandler):

    __url__ = '/data/(.+)'

    def _linebarpointdata(self):
        d = {}
        d['showx'] = ['SampleA','SampleB','SampleC','SampleD','SampleE']
        d['ydata'] = [
            {'name':'Y0','realdata':[Util.RAND(),Util.RAND(),Util.RAND(),Util.RAND(),Util.RAND()]},
            {'name':'Y1','realdata':[Util.RAND(),Util.RAND(),Util.RAND(),Util.RAND(),Util.RAND()]},
            {'name':'Y2','realdata':[Util.RAND(),Util.RAND(),Util.RAND(),Util.RAND(),Util.RAND()]}
        ]
        return d

    def _pie_data(self):
        d = {}
        d['ydata'] = [
            {'name':"SampleA" , 'value': Util.RAND()}
            ,{'name':"SampleB" , 'value': Util.RAND()}
            ,{'name':"SampleC" , 'value': Util.RAND()}
            ,{'name':"SampleD" , 'value': Util.RAND()}
            ,{'name':"SampleE" , 'value': Util.RAND()}
            ,{'name':"SampleF" , 'value': Util.RAND()}
        ]
        return d;


    def get(self,_type):

        if _type == 'pie':
            self.echo_data(self._pie_data())
        elif _type == 'line':
            self.echo_data(self._linebarpointdata())
        elif _type == 'bar':
            self.echo_data(self._linebarpointdata())
        elif _type == 'point':
            self.echo_data(self._linebarpointdata())


