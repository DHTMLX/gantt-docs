---
title: "数据验证"
sidebar_label: "数据验证"
---

# 数据验证

数据验证允许您控制用户输入的数据，以排除保存不正确值的可能性。  
例如，通过验证，您可以拒绝给同一人分配两个同时进行的任务。

通常，要验证用户输入的数据，可以使用 [dhtmlxGantt API](api/overview/events-overview.md) 提供的事件，并对输入数据进行捕获以根据其正确性进行处理：

## 客户端验证

以下事件在数据验证方面最重要且最常用：

- [onLightboxSave] - 当用户在弹出层中点击“保存”按钮时触发
- [onBeforeTaskAdd] - 在新任务被添加到甘特图之前触发
- [onBeforeTaskChanged] - 在任务更新之前触发
- [onBeforeLinkAdd] - 在新连线被添加到甘特图之前触发
- [onBeforeLinkUpdate] - 在连线被更新之前触发

最简单的验证可以依靠 [onLightboxSave] 事件来实现。该事件在用户在表单上的“保存”按钮点击时被触发。  
从事件返回 *true* 将保存更改，返回 *false* 将取消后续处理并保持弹出层打开。

例如，如果未为任务分配任何用户以限制保存该任务，请使用如下代码：

~~~js
gantt.attachEvent("onLightboxSave", function(id, item){
    if(!item.text){
        gantt.message({type:"error", text:"Enter task description!"});
        return false;
    }
    if(!item.user){
        gantt.message({type:"error", text:"Choose a worker for this task!"});
        return false;
    }
        return true;
});
~~~

[验证 lightbox 的值](https://docs.dhtmlx.com/gantt/samples/05_lightbox/03_validation.html)

## 服务器端验证

上述方案存在一个不足之处——如果通过内联编辑器修改弹出层中的数据，或通过在甘特图上拖动来修改数据，该事件不会触发。

为了证明这一点并捕获甘特图中所做的所有更改（编辑、创建、删除等），请使用 [dataProcessor](guides/server-side.md) 对象，或者更准确地说，使用它的一个事件 - [onBeforeUpdate](https://docs.dhtmlx.com/api__dataprocessor_onbeforeupdate_event.html)。该事件在将数据发送到服务器之前触发，并在甘丁图中进行的任何更改之后触发（不仅限于弹出层中的修改）。

~~~js
gantt.init("gantt_here");
gantt.load("data.php");
 
var dp = new gantt.dataProcessor("data.php");
dp.init(gantt);

dp.attachEvent("onBeforeUpdate", function (id, status, data) {
     if (!data.text) {
         gantt.message("The event's text can't be empty!");
         return false;
     }
     return true;
});
~~~

其中：

- **id** - (*string*) 任务的 ID。
- **status** - (*'updated', 'inserted', deleted'*) 任务的操作状态。
- **data** - (*object*) 要发送的数据。

注意，当字段未通过验证时，变更不会发送到服务器，而是保留在客户端，并可用于进一步处理。