---
layout: post
title: "Unity敌人每秒减少一点能量"
date: "2021-08-06"
keywords: unity
category: unity
tags: unity
---
```c#

    private int energy=100;
    public Text energysNum;

    void Update()
    {
        if (Time.time >= nextTime) 
            {
                energy--;
                energysNum.text = energy.ToString();
                if (energy == 0)
                {
                    Invoke("success", 0.5f);
                }
                nextTime = Time.time + 1;
            }
    }
```