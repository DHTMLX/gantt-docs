---
sidebar_label: drag_link_class
title: drag_link_class template
description: "定义当用户拖动链接时显示的弹出窗口所应用的CSS类。"
---

# drag_link_class

### Description

@short: 定义当用户拖动链接时显示的弹出窗口所应用的CSS类。

@signature: drag_link_class: (from: string | number, from_start: boolean, to: string | number, to_start: boolean) =\> string | void;

### Parameters

- `from` - (required) *string | number* - 源任务的ID
- `from_start` - (required) *boolean* - 如果链接是从源任务的开始处拖动，则为<i>true</i>，如果是从结束处拖动，则为<i>false</i>
- `to` - (required) *string | number* - 目标任务的ID（如果目标任务尚未设置，则为'null'或'undefined'）
- `to_start` - (required) *boolean* - 如果链接拖动到目标任务的开始处，则为<i>true</i>，如果拖动到结束处，则为<i>false</i>

### Returns
- ` text` - (string | void) - 相关项的CSS类

### Example

~~~jsx
gantt.templates.drag_link_class = function(from, from_start, to, to_start) {
    let add = "";
    if(from && to){
        const allowed = gantt.isLinkAllowed(from, to, from_start, to_start);
        add = (allowed ? "gantt_link_allow" : "gantt_link_deny");
    }
    return `gantt_link_tooltip ${add}`;
};
~~~

### Related Guides
- [依赖关系链接的模板](guides/dependency-templates.md)
