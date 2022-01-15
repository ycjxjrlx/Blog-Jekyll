---
layout: post
title: "逆风靠谷歌，绝境靠百度"
date: "2022-01-15"
keywords: unity
category: unity
tags: unity
---
需求：按下房间列表按钮,弹出提示框.难点：由于按钮是预制体，不能通过拖拽引用场景物体中脚本的函数。也就是说不能傻瓜式拖拽，得用代码添加监听并调用函数。

逆风靠谷歌，绝境靠百度。最终在百度找到相关代码。[unity给多个Button添加点击事件][1]

1.先写一段下面的代码 ，用来挂到按钮的预制体上

```
using UnityEngine;
using System.Collections;
using UnityEngine.UI;
using System;
/// <summary>
/// 此脚本挂到Button的预制体上
/// </summary>
public class LevelButtonEvent : MonoBehaviour {
    //唯一按钮对应的唯一ID
    public int id; 
    private Button btnLevel;
    //获取Button
    public Button BtnLevel
    {
        get { return btnLevel ?? GetComponent<Button>(); }
    }
    //定义一个有int类型参数的事件
    public event Action<int> onLevelButtonOnClick;
	void Start () {
        BtnLevel.onClick.AddListener(ButtonOnclick);
    }
    /// <summary>
    /// 当按钮被点击的时候
    /// </summary>
    public void ButtonOnclick()
    {
        if (onLevelButtonOnClick!=null)
        {
            onLevelButtonOnClick(id);
        }
    }
}
```

2.在Button预制体被实例化的时候，给ID赋值，同时监听按钮点击事件

```
    /// <summary>
    /// 生成关卡选择按钮
    /// </summary>
    public void LoadSelectButton( )
    {
        //获取Button预制体
        GameObject LevelIcon = Resources.Load<GameObject>("Icon/Level");
        for (int i =0; i < 10; i++)
        {
            //实例化
            GameObject Btn = Instantiate(LevelIcon);
            //获取Button预制体上脚本（也可以自己Add）
            LevelButtonEvent LevelButtonNum = Btn.GetComponent<LevelButtonEvent>();
            //给Button上的ID赋值
            LevelButtonNum.id = (i + 1);
            //监听
            LevelButtonNum.onLevelButtonOnClick += LevelButtonNum_onLevelButtonOnClick;  
        }        
    }
    
    /// <summary>
    /// 监听的方法
    /// </summary>
    /// <param name="obj"></param>
    private void LevelButtonNum_onLevelButtonOnClick(int obj)
    {
         Debug.Log("点击的关卡数"+obj);
    }
```

能添加监听，点击引用函数即可，根据自身情况进行修改。

--------
[1]: https://blog.csdn.net/hyp19980829/article/details/85237054