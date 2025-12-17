---
sidebar_label: $click
title: $click config
description: "更改甘特图中按钮的默认点击操作"
---

# $click

### Description

@short: 更改甘特图中按钮的默认点击操作

@signature: $click: any

### Example

~~~jsx
gantt.config.quickinfo_icons=["icon_delete","icon_edit","advanced_details_button"]; 
gantt.locale.labels["advanced_details_button"] = "高级信息";
gantt.init("gantt_here");

gantt.$click.advanced_details_button=function(e, id, trg){
    gantt.message("这些是高级详情"); 
    return false; //阻止默认行为
};
~~~

### Details

:::note
 该按钮的行为将在lightbox和quick info弹出窗口中同时更新。 
:::

标准甘特图中的$click对象如下所示:

~~~js
{
    buttons: {
        delete: function (id){...},
        edit: function (id){...},
    }
}
~~~
