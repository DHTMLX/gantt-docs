---
sidebar_label: $click
title: $click config
description: "重新定义 Gantt 图中按钮的默认点击行为"
---

# $click

### Description

@short: 重新定义 Gantt 图中按钮的默认点击行为

@signature: $click: any

### Example

~~~jsx
gantt.config.quickinfo_icons=["icon_delete","icon_edit","advanced_details_button"]; 
gantt.locale.labels["advanced_details_button"] = "Advanced Info";
gantt.init("gantt_here");

gantt.$click.advanced_details_button=function(e, id, trg){
    gantt.message("这些是高级详情"); 
    return false; //阻止默认行为
};
~~~

### Details

:::note
按钮的行为将针对 lightbox 和 quick info 弹出框重新定义。
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