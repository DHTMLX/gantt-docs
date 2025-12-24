---
title: "显示任务内容"
sidebar_label: "显示任务内容"
---

# 显示任务内容

任务条旁边的标签可用于显示与任务相关的额外细节信息。通常，这包括分配的资源信息，如人员、材料等。

![assigned_text](/img/assigned_text.png)

## 自定义任务条的显示格式

要修改任务条的默认外观，可以使用 [task_text](api/template/task_text.md) 模板:

~~~js
gantt.templates.task_text="function(start,end,task){"
    return "<b>Text:</b> "+task.text+",<b> Holders:</b> "+task.users;
};
~~~

该模板可以包含任何你希望在任务条内部显示的 HTML 内容。


[Styling task bars with events](https://docs.dhtmlx.com/gantt/samples/04_customization/08_templates.html)


![task_text](/img/task_text.png)

## 在任务条左侧显示文本

若要在任务条左侧添加文本块，请使用 [leftside_text](api/template/leftside_text.md) 模板:

~~~js
gantt.templates.leftside_text = function(start, end, task){
    return "<b>Priority: </b>" +task.priority;
};
~~~

[Define side content](https://docs.dhtmlx.com/gantt/samples/04_customization/01_outer_content.html)


## 在任务条右侧显示文本

若要在任务条右侧添加文本块，请使用 [rightside_text](api/template/rightside_text.md) 模板:

~~~js
gantt.templates.rightside_text = function(start, end, task){
    return "<b>Holders: </b>" + task.users;
};
~~~


[Define side content](https://docs.dhtmlx.com/gantt/samples/04_customization/01_outer_content.html)

