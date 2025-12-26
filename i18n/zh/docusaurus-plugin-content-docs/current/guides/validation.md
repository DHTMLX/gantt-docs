---
title: "验证"
sidebar_label: "验证"
---

# 验证

验证有助于确保用户输入的数据准确无误，并防止保存不正确的值。例如，它可以防止在同一时间将两个任务分配给同一个人。

通常，可以通过使用 [dhtmlxGantt API](api/overview/events-overview.md.md) 的事件来拦截并检查输入数据的正确性来进行数据验证:

## 客户端验证

以下事件是进行数据验证时的关键且常用事件:

- [onLightboxSave](api/event/onlightboxsave.md) - 当用户点击弹窗中的"保存"按钮时触发
- [onBeforeTaskAdd](api/event/onbeforetaskadd.md) - 在甘特图中添加新任务之前触发
- [onBeforeTaskChanged](api/event/onbeforetaskchanged.md) - 在任务被更新之前触发
- [onBeforeLinkAdd](api/event/onbeforelinkadd.md) - 在甘特图中添加新依赖关系之前触发
- [onBeforeLinkUpdate](api/event/onbeforelinkupdate.md) - 在依赖关系被更新之前触发

实现验证最简单的方法是使用 [onLightboxSave](api/event/onlightboxsave.md) 事件。当用户在表单中点击"保存"时，该事件会被触发。返回 *true* 允许保存更改，而返回 *false* 则会取消保存并保持弹窗处于打开状态。

例如，为了防止在没有分配用户的情况下保存任务，可以使用如下代码:

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

[Validate lightbox values](https://docs.dhtmlx.com/gantt/samples/05_lightbox/03_validation.html)


## 服务端验证

上述方法的一个局限性是:如果通过内联编辑或拖拽任务进行更改，则不会触发该事件。

为了覆盖所有更改场景--包括编辑、创建和删除--可以使用 [dataProcessor](guides/server-side.md) 对象，特别是其 [onBeforeUpdate](https://docs.dhtmlx.com/api__dataprocessor_onbeforeupdate_event.html) 事件。该事件会在数据发送到服务器之前、并且甘特图发生任何修改后触发，无论修改是如何产生的。

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
 
参数说明如下:

- **id** - (*string*) 任务的标识符。
- **status** - (*'updated', 'inserted', 'deleted'*) 任务的操作状态。
- **data** - (*object*) 将要发送的数据。

请注意，如果某个字段未通过验证，更改将不会发送到服务器，而是保留在客户端，可以进一步处理。

