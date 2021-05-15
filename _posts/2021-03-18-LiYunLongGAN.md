---
layout: post
title:  "李云龙二次元风格化！一键fork你也能行 "
date:   2021-03-18 12:38:00 +0800--
categories: [技术]
tags: [GAN, interesting]  
---



## 李云龙二次元风格化！一键star、fork，你也可以生成这样的团长！
**打滚卖萌求star求fork!**

- 视频效果前往B站观看效果最佳：[李云龙二次元风格化](https://www.bilibili.com/video/bv1B54y187tY)：   
- github开源repo：[李云龙二次元风格化](https://github.com/oukohou/PaddleGAN-develop)    
- 百度AIstudio开源地址,一键fork即可运行:  [李云龙二次元风格化！一键fork你也能行](https://aistudio.baidu.com/aistudio/projectdetail/1671397)      
具体详细操作也在AIstudio上一步步列举了,求star求fork!    
- csdn步骤解析: [李云龙二次元风格化！一键fork你也能行](https://blog.csdn.net/oukohou/article/details/114936767)


### 1.首先要找到自己要操作的视频素材，将视频的音频单独提取出来备用  
我自己找的资源放在了`codes/videos/liyunlong`文件夹下，是李云龙名场面：  
**你咋不敢跟旅长干一架呢**！→**旅长我给你跪下了**  
![名场面](https://raw.githubusercontent.com/oukohou/image_gallery/master/contestorigin%252Bcartoon.png)

### 2.话不多说，进入代码实操：  
- 安装基本环境  
```bash
!pip install -r codes/PaddleGAN-develop/requirements.txt
```
-  导入基本环境  
```python
import paddle 
import os 
import sys 
sys.path.insert(0,'codes/PaddleGAN-develop')
from ppgan.apps import AnimeGANPredictor
```

### 3.GAN它！  
**友情提示**：此处最好使用GPU环境，cpu推理属实是有点点慢  


##### 使用paddlepaddle预训练好的animeGANv2模型对视频进行风格迁移：  

```python
from ppgan.apps import AnimeGANPredictor
import cv2

predictor = AnimeGANPredictor('',None,)
video_src = 'codes/videos/liyunlong/格式工厂混流 亮剑-03+亮剑-03+亮剑-04 00_00_23-.mp4'
video_ = cv2.VideoCapture(video_src)
video_name_ = os.path.basename(video_src)
total_frames = video_.get(cv2.CAP_PROP_FRAME_COUNT)
fps_ = video_.get(cv2.CAP_PROP_FPS)
print("video {}, fps:{}, total frames:{}...".format(video_name_, fps_, total_frames))
frame_count_ = 0
save_per_frames = 1
dst_dir = 'codes/videos/liyunlong/'
out_video = cv2.VideoWriter('{}/hayao_{}'.format(dst_dir, video_name_),
                                cv2.VideoWriter_fourcc(*'DIVX'), int(fps_),
                                (int(video_.get(3)), int(video_.get(4))))
print('now begin...')
while True:
    ret_, frame_ = video_.read()
    if not ret_:  # or len(fps_list_) == 0:
        print('end of video...')
        break
    result_frame = predictor.anime_image_only(frame_)
    if frame_count_ % save_per_frames == 0:
        out_video.write(result_frame)
    frame_count_ = frame_count_ + 1
    if frame_count_ % 100 == 0:
        print("{}/{} processed...".format(frame_count_, int(total_frames)), flush=False)
```

### 4.合并生成的视频和之前分离的音频：  
```python
!ffmpeg -i codes/videos/liyunlong/hayao_格式工厂混流 亮剑-03+亮剑-03+亮剑-04 00_00_23-.mp4 -i codes/videos/liyunlong/音频1.aac -c:v copy -c:a aac -strict experimental codes/videos/liyunlong/李云龙二次元化.mp4
```
这样就大功告成啦~~~  
**打滚卖萌求star、fork！**  

- 视频效果前往B站观看效果最佳：[李云龙二次元风格化](https://www.bilibili.com/video/bv1B54y187tY)：   
- github开源repo：[李云龙二次元风格化](https://github.com/oukohou/PaddleGAN-develop)    
- 百度AIstudio开源地址,一键fork即可运行:  [李云龙二次元风格化！一键fork你也能行](https://aistudio.baidu.com/aistudio/projectdetail/1671397)      
具体详细操作也在AIstudio上一步步列举了,求star求fork!    
- csdn步骤解析: [李云龙二次元风格化！一键fork你也能行](https://blog.csdn.net/oukohou/article/details/114936767)



<br>
微信公众号：璇珠杂俎(也可搜索[oukohou](https://mp.weixin.qq.com/s/dCxGcuv5ngyR6U-uBYVI9Q))，提供本站优质非技术博文～～
[![wechat_official_account](https://www.oukohou.wang/assets/imgs/wechat_official_account.png)](https://mp.weixin.qq.com/s/dCxGcuv5ngyR6U-uBYVI9Q "点击图像直达微信公众号～～")  




<br>
<p  align="right">regards.</p>
<h4 align="right">
    <a href="https://www.oukohou.wang/">
        oukohou.
    </a>
</h4>

