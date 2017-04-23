#coding=utf-8

import hashlib
import random

def MD5(str):
    return hashlib.md5(str).hexdigest()

def RAND(f=0,t=1000):
    return random.randint(f, t)  

def Rstring(l):
    return "".join(random.sample('abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHKJKLMNOPQRSTUVWXYZ',l))

