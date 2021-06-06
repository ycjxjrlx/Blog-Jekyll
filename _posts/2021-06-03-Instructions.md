---
layout: post
title: 博客搭建历程
keywords: 博客 GitHub Jekyll 
category: 日志
tags: 博客 jekyll 
---

### 为什么要搭建一个独立博客？

​　　很早前我就有一个搭建个人网站的小目标，可惜当时没有提出具体想法，导致这一小目标被搁置太久。后来偶然浏览过几位大佬的个人博客，美观又大气。说来惭愧，虽是抱着学习的心态观摩，我不了解他们所说的技术，却对其心路历程感同身受。技术诚可贵，生活价更高，遂决意搭建个人博客，写写微不足道的技术，写写稍纵即逝的小日子。

### 博客搭建史：

​　　搭建博客确实走了不少弯路，但又因为站在巨人肩膀上，也走了不少捷径。

　　开始我选择在Django框架下搭建博客，因为大学做项目用过Django，从相对熟悉的框架起手本无可厚非，我也找到了非常满意的可参考 [博客项目][1]。

![blog-django](/assets/imgs/Blog-Django.png)
PS.对此Django博客项目感兴趣的朋友可以[点击此处][2]。

​　　然而就在我一番捣鼓、逐步化为己用的时候，出了差错。

​　　网上搭建个人网站的教程许多，大多教程要求准备**域名**与**主机**（服务器）。就我个人而言，域名在有搭建网页想法的时候就已早早申请，而主机迟迟没有下手的原因很简单，就是贵（个人而言）。好在也有不需要主机甚至不需要域名的网页搭建教程，这需要用到**github pages**。免费虽好，却多了限制，官方给出的说法是 **无法在Github页面上托管Django网站。Github页面用于静态站点，而Django需要Python动态生成页面** 。所以即使我已经成功运行并修改了[博客项目][1]，也只能放弃转而寻求支持生成静态博客的工具，之后我随机选择了**jekyll**，就此开始了此博客的搭建。


### 如何搭建？

安装 Jekyll 本地环境，以便于调试：

```bash
gem install jekyll
jekyll new my-awesome-site
cd my-awesome-site
bundle install
bundle exec jekyll serve
# => 打开浏览器 http://localhost:4000
```

下载原作者主题安装调试：

```bash
git clone https://github.com/alafighting/maupassant-jekyll.git maupassant
cd maupassant
# 当然你也可以选择clone我的这个更改后的博客主题，只需改一下地址即可：
# git clone https://github.com/ycjxjrlx/Blog-Jekyll Blog-Jekyll
# cd Blog-Jekyll
gem install jekyll-paginate
jekyll build
jekyll server
```

至此，就可以成功运行我的博客啦。


### 如何修改？

声明：我的博客主题通过[oukohou的博客][3]修改而来，希望你在介绍自己的博客主题时，也能援引一下我的博客主题。

#### 换皮式修改

　　博客标题、博客副标题、友情链接、代码仓库等内容，可在_config.yml文件内进行修改。

　　心情随笔、推荐文章等内容，可在\_includes\widgets对应文件修改。

　　博文在_posts文件夹内添加修改。

#### 进一步修改

　　通过以上操作，博客已经在外观上属于你个人，不过博客主题里的部分内容，涉及到一些信息获取的事宜(比如百度统计的代码，你不改的话， 我可以直接获取到你的网站的各种访问信息)，所以还需要进一步修改。

　　还记得oukohou大佬吗，因为我的博客主题是通过[oukohou的博客][3]修改而来，而他已经写了注意事项和教程，我就偷懒不重复啦，直接上[传送门][4]。

--------
[1]: https://github.com/erenming/blog
[2]: https://sanzhixiaozhu.top/博客/2021/06/06/Django.html
[3]: https://www.oukohou.wang/
[4]: https://www.oukohou.wang/2018/12/18/notices-for-jekyll-themes-fork/
