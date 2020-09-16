# coding:utf-8

import os

postPath = 'E:/Recent/MyBlog/source/_posts' # _posts文件夹位置
path = os.path.dirname(__file__) # 所在文件夹位置

def getFile(logPath):
	text = ""
	for file in os.listdir(logPath):
		fileInput = os.path.join(logPath,file)
		with open(fileInput,'r',encoding="utf-8")as fi:
			text += fi.read()
	return set(text)

content = "".join(getFile(postPath))
print (content)

title = "<meta charset=\"UTF-8\">\n<link rel=\"stylesheet\" href=\"word.css\">\n<body>\n"

content = title + content +"\n</body>"

fileOutput = os.path.join(path,"word.html")
with open(fileOutput,'w',encoding="utf-8")as fo:
	fo.write(content)
print("Words are collected.\n")