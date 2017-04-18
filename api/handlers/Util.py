#coding=utf-8

import hashlib

def MD5(str):
    return hashlib.md5(str).hexdigest()
