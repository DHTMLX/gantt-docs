---
title: "事件处理"
sidebar_label: "事件处理"
---

事件处理
===================================

事件是让页面对用户操作做出交互和响应的关键。

每当用户与 Gantt 图进行交互时，dhtmlxGantt 会触发一个事件。这些事件可用于检测发生了什么并执行相应的代码。

事件绑定
--------------------------------------------

要添加事件监听器，请使用 [attachEvent](api/method/attachevent.md) 方法。

~~~js
gantt.attachEvent("onTaskClick", function(id, e) {
    alert("You've just clicked an item with id="+id);
});
~~~

[D'n'D Events](https://docs.dhtmlx.com/gantt/samples/08_api/01_dnd_events.html)


**注意:**

- 事件名称不区分大小写。
- 可以为同一个事件绑定多个处理函数。

事件解绑
-------------------------

要移除事件处理器，请使用 [detachEvent](api/method/detachevent.md) 方法:

[A general way to attach/detach the event handler](A general way to attach/detach the event handler)
~~~js
// 绑定事件
var eventId = gantt.attachEvent("onTaskClick", function(id, e) {
    alert("You've just clicked an item with id="+id);
});
// 解绑事件
gantt.detachEvent(eventId);/*!*/
~~~

如果想一次性移除所有处理器，可以采用以下方法:

~~~js
// 在绑定事件时保存处理器 id
var events = [];
events.push(gantt.attachEvent("onTaskClick", function(id, e) {
    alert("You've just clicked an item with id="+id);
});
events.push(gantt.attachEvent("onTaskDblClick", function(id, e) {
    alert("You've just double clicked an item with id="+id);
});
 
// 解绑所有已保存的事件
while (events.length)
   gantt.detachEvent(events.pop()); /*!*/
~~~

检查处理器是否存在
------------------------------------------

要验证某个事件是否已绑定处理器，请使用 [checkEvent](api/method/checkevent.md) 方法:

~~~js
gantt.attachEvent("onTaskClick", function(id, e) {
    alert("You've just clicked a task with id="+id);
});
 
gantt.checkEvent("onTaskClick"); //返回 'true' /*!*/
~~~

可取消事件
-----------------------

以 'onbefore' 开头的事件可以被取消。

要取消此类事件，让事件处理函数返回 **false** 即可。

**Cancelling the event handler**
~~~js
gantt.attachEvent("onBeforeTaskChanged", function(id, mode, old_task){
    var task = gantt.getTask(id);
    if(mode == gantt.config.drag_mode.progress){
        if(task.progress < old_task.progress){
            dhtmlx.message(task.text + " progress can't be undone!");
            return false; /*!*/
        }
    }
    return true;
});
~~~


[D'n'D Events](https://docs.dhtmlx.com/gantt/samples/08_api/01_dnd_events.html)


在处理函数中访问 gantt 对象
---------------------------------
在事件处理函数内部，可以通过关键字 **this** 访问 gantt 对象。<br/>

**Referring within the event handler**
~~~js
gantt.attachEvent("onTaskClick", function(id, e){
    parentId = this.getTask(id).parent;
});
~~~

