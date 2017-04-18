#!/usr/bin/env python
#coding=utf-8

import os

os.system("python -u api/api.py > logs/r.log 2>&1 &")
os.system("python -m SimpleHTTPServer > logs/h.log 2>&1 &")
