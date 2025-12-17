---
sidebar_label: drag_link
title: drag_link template
description: "定义在创建新依赖链接时显示的tooltip文本"
---

# drag_link

### Description

@short: 定义在创建新依赖链接时显示的tooltip文本

@signature: drag_link: (from: string | number, from_start: boolean, to: string | number, to_start: boolean) =\> string;

### Parameters

- `from` - (required) *string | number* - 源任务的ID
- `from_start` - (required) *boolean* - <i>true</i> 表示链接是从源任务的开始端拖动，<i>false</i> 表示从结束端拖动
- `to` - (required) *string | number* - 目标任务的ID（如果目标任务尚未指定，则为 'null' 或 'undefined'）
- `to_start` - (required) *boolean* - <i>true</i> 表示链接拖动到目标任务的开始端，<i>false</i> 表示拖动到结束端

### Returns
- ` text` - (string) - 将在gantt中显示的html文本

### Example

~~~jsx
gantt.templates.drag_link = function(from, from_start, to, to_start) {
    const sourceTask = gantt.getTask(from);

    let text = `From:<b> ${sourceTask.text}</b> ${(from_start?"Start":"End")}<br/>`;
    if(to){
        const targetTask = gantt.getTask(to);
        text += `To:<b> ${targetTask.text}</b> ${(to_start?"Start":"End")}<br/>`;
    }
    return text;
};
~~~

### Related Guides
- [依赖关系链接的模板](guides/dependency-templates.md)
