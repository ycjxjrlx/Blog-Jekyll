---
layout: post
title: "爬取术语创建术语库"
date: "2021-07-13"
keywords: 术语 Tables
category: 爬虫
tags: 术语库
---

#### 需求：爬取专业术语，建立一个术语库。

　　　最近需要用到百度api，其中[百度翻译开发平台][1]可以免费建立术语库（不像SDL必须得激活才能建立和使用术语库）。目前已有在线的[计算机专业术语数据库][2],只需要将其爬取下来,即可建立并使用自己的术语库。

#### 实现：一.爬虫

对网页的简单分析后发现，目标数据不在网页源码中，需要找对的URL：

右键检查→Network→XHR→刷新网页→在name里找到目标对应的URL

爬取网页所有的tables

输出表tables数量和tables,发现其中有一个表不能用

```py
url = "https://api.aminer.cn/api/article/alias/ml_taxonomy"
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'}
r = requests.get(url,headers=headers)#获得服务器响应
html_code = r.content.decode(r.encoding)#解码
tables = pd.read_html(html_code)
print("table数量:",len(tables))
print(tables)
```
![tables](/assets/imgs/tables.jpg)

修改爬取的表，仅保留目标数据

```py
def change():
    # 对表修改(将第0行变成我们的表头,并删除原来的第0行)
    df1 = tables[i]
    df1.columns = list(df1.iloc[0])
    df1 = df1.drop([0], axis=0)
    # 删除'相关学者', '相关论文'这两列
    df1 = df1.drop(['相关学者', '相关论文'], axis=1)
    # 重建索引
    df1.reset_index(drop=True)
    tables[i] = df1
    print(i)
    print(df1)
```

全部代码

```py
import requests
from lxml import etree
import pandas as pd

url = "https://api.aminer.cn/api/article/alias/ml_taxonomy"
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'}
r = requests.get(url,headers=headers)#获得服务器响应
html_code = r.content.decode(r.encoding)#解码
tables = pd.read_html(html_code)
print("table数量:",len(tables))
frames=[]

def change():
    # 对表修改(将第0行变成我们的表头,并删除原来的第0行)
    df1 = tables[i]
    df1.columns = list(df1.iloc[0])
    df1 = df1.drop([0], axis=0)
    # 删除'相关学者', '相关论文'这两列
    df1 = df1.drop(['相关学者', '相关论文'], axis=1)
    # 重建索引
    df1.reset_index(drop=True)
    tables[i] = df1
    print(i)
    print(df1)

    #df1.to_csv("std.csv", index=False)

#第19个表不可用，于是这么写
for i in range(19):
    change()

for i in range(20,25):
    change()

#将24个表合并
# frames = [tables[0], tables[1], tables[2],tables[3], tables[4], tables[5],tables[6], tables[7],
#           tables[8], tables[9], tables[10], tables[11], tables[12], tables[13], tables[14], tables[15],
#           tables[16], tables[17], tables[18], tables[20], tables[21], tables[22], tables[23], tables[24]]
# result = pd.concat(frames)
# print(result)
# result.to_csv("data.csv", index=False,  encoding='utf_8_sig')

```

#### 二.建立术语库

上一步获得.csv文件，另存为.txt文件，阅读百度翻译开发平台导入术语的要求

> 2. 源语言和目标语言中间以三条竖线分隔。

这个简单，由于csv表格转txt文件后，术语与译文间以空格隔开。在记事本按住ctrl+h快捷键，将空格替换为三条竖线即可。

然后导入术语，导入失败，检查csv文件后发现（csv表格看的比txt文件更清晰）有几个术语译文为空，网站数据有几个术语没有译文导致。导入术语的格式要求比较严格，于是删掉问题行后重新生成txt导入。

该txt文件已上传至[**csdn**][3]

导入成功，但是译文均为乱码，原因未明，不过我测试后发现只导入该txt文件部分内容不会乱码，可能是数据过多导致的乱码，于是分两次导入，最终成功建立术语库。

友情链接：[论文翻译器+知云+百度API+计算机术语库][4]

--------
[1]: https://fanyi-api.baidu.com/api/trans/product/desktop
[2]: https://www.aminer.cn/ml_taxonomy
[3]: https://download.csdn.net/download/don952509/20232520
[4]: https://blog.csdn.net/xiaoana_139/article/details/110790723