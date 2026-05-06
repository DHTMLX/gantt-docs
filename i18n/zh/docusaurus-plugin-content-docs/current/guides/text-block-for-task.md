---
title: "显示任务的内容"
sidebar_label: "显示任务的内容"
---

# 显示任务的内容

任务条附近的文本允许你显示与该任务相关的附加信息。 
在大多数情况下，它是一些被分配的资源，例如人员、材料等。

![分配的文本](/img/assigned_text.png)

## 自定义任务条的格式

要更改任务条的默认格式，你可以使用 [task_text](api/template/task_text.md) 模板：

~~~js
gantt.templates.task_text="function(start,end,task){"
    return "<b>Text:</b> "+task.text+",<b> Holders:</b> "+task.users;
};
~~~

它可以包含应该显示在任务条内的任意 HTML 内容。


[通过事件为任务条设置样式](https://docs.dhtmlx.com/gantt/samples/04_customization/08_templates.html)


![task_text](/img/task_text.png)

## 将文本放置在条形左侧

要将文本块放置在任务条的左侧，请使用 [leftside_text](api/template/leftside_text.md) 模板：

~~~js
gantt.templates.leftside_text = function(start, end, task){
    return "<b>Priority: </b>" +task.priority;
};
~~~

[定义侧边内容](https://docs.dhtmlx.com/gantt/samples/04_customization/01_outer_content.html)


## 将文本放置在条形右侧

要将文本块放置在任务条的右侧，请使用 [rightside_text](api/template/rightside_text.md) 模板：

~~~js
gantt.templates.rightside_text = function(start, end, task){
    return "<b>Holders: </b>" + task.users;
};
~~~

[定义侧边内容](https://docs.dhtmlx.com/gantt/samples/04_customization/01_outer_content.html)