--- 
title: "事件处理" 
sidebar_label: "事件处理" 
---

# 事件处理

事件有助于与用户互动并为页面带来交互性。

当用户在甘特图中执行某个操作时，dhtmlxGantt 会触发一个事件。您可以利用此事件来检测该操作并执行所需的代码。

## 绑定事件

要绑定事件，请使用 [`attachEvent()`](api/method/attachevent.md) 方法。

~~~js
gantt.attachEvent("onTaskClick", (id, e) => {
    alert(`You've just clicked an item with id=${id}`);
});
~~~

**相关示例**： [D'n'D Events](https://docs.dhtmlx.com/gantt/samples/08_api/01_dnd_events.html)

**注：**

- 事件名称不区分大小写。
- 您可以为同一个事件绑定多个处理程序。

## 解绑事件

要解绑事件处理程序，请使用 [`detachEvent()`](api/method/detachevent.md) 方法：

~~~jsx {6} title="绑定/解绑事件处理程序的一般方法"
// 要绑定事件
const eventId = gantt.attachEvent("onTaskClick", (id, e) => {
    alert(`You've just clicked an item with id=${id}`);
});
// 要解绑事件
gantt.detachEvent(eventId);
~~~  

要一次性解绑所有处理程序，可以使用如下逻辑：

~~~js {13}
// 在绑定事件时保存处理程序的 id
const eventIds = [];

eventIds.push(gantt.attachEvent("onTaskClick", (id, e) => {
    alert(`You've just clicked an item with id=${id}`);
}));
eventIds.push(gantt.attachEvent("onTaskDblClick", (id, e) => {
    alert(`You've just double clicked an item with id=${id}`);
}));

// 解绑所有已保存的事件
while (eventIds.length) {
    gantt.detachEvent(eventIds.pop());
}
~~~

## 检查处理程序是否存在

要检查是否有为特定事件绑定了处理程序，请使用 [`checkEvent()`](api/method/checkevent.md) 方法：

~~~js {5}
gantt.attachEvent("onTaskClick", (id, e) => {
    alert(`You've just clicked a task with id=${id}`);
});

gantt.checkEvent("onTaskClick"); // returns 'true'
~~~

## 可取消的事件

所有带有前缀 'onbefore' 的事件都可以被取消。

要取消某个事件，请在相应的事件处理程序中返回 **false**。

~~~jsx {6} title="取消事件处理程序"
gantt.attachEvent("onBeforeTaskChanged", (id, mode, oldTask) => {
    const task = gantt.getTask(id);
    if (mode === gantt.config.drag_mode.progress) {
        if (task.progress < oldTask.progress) {
            dhtmlx.message(`${task.text} progress can't be undone!`);
            return false;
        }
    }
    return true;
});
~~~

**相关示例**： [D'n'D Events](https://docs.dhtmlx.com/gantt/samples/08_api/01_dnd_events.html)

## 在处理程序中访问 gantt 对象

在事件处理程序内部，您可以通过关键字 `this` 引用 gantt 对象。

~~~jsx title="在事件处理程序中引用"
gantt.attachEvent("onTaskClick", function(id, e) {
    const parentId = this.getTask(id).parent;
});
~~~