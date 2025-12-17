---
sidebar_label: link_description
title: link_description template
description: "设置链接'删除'确认窗口头部显示的文本"
---

# link_description

### Description

@short: 设置链接"删除"确认窗口头部显示的文本

@signature: link_description: (link: any) =\> string;

### Parameters

- `link` - (required) *object* - 链接对象

### Returns
- ` text` - (string) - html文本，将在gantt中渲染

### Example

~~~jsx
gantt.templates.link_description = function(link){
    const from = gantt.getTask(link.source);
    const to = gantt.getTask(link.target);
    const types = gantt.config.links;

    const from_start = link.type == types.start_to_start;
    const to_start = link.type == types.finish_to_start ||  
                    link.type == types.start_to_start;
    return `From <b>${from.text}</b> ${(from_start?"Start":"End")}<br/>
To <b>${to.text}</b> ${(to_start ? "Start" : "End")}<br/>`;
};
~~~

### Related Guides
- [依赖关系链接的模板](guides/dependency-templates.md)
