---
title: "自定义灯箱"
sidebar_label: "自定义灯箱"
---

# 自定义灯箱

## 创建自定义灯箱的方法

你可以为甘特图创建一个完全自定义的灯箱，并用它替换默认的灯箱。共有两种实现方式：

1. 通过重新定义 [`showLightbox()`](api/method/showlightbox.md) 方法：

~~~js
gantt.showLightbox = (id) => {
    // code of the custom form
};
~~~

- `id` - (string/number) - 任务ID

还有 [`hideLightbox()`](api/method/hidelightbox.md) 方法，可帮助实现灯箱。

让我们创建一个 HTML 容器 "my-form"，将放置自定义灯箱：

~~~html
<div id="my-form">
    <label for="description">Task text
        <input type="text" name="description" value="">
    </label>
    <input type="button" name="save" value="Save">
    <input type="button" name="close" value="Close">
    <input type="button" name="delete" value="Delete">
</div>
~~~

然后要制作一个自定义灯箱，可以使用如下配置：

~~~js
let currentTaskId = null;

gantt.showLightbox = (id) => {
    currentTaskId = id;
    const task = gantt.getTask(id);

    const form = getForm();
    const descriptionInput = form.querySelector("[name='description']");
    descriptionInput.focus();
    descriptionInput.value = task.text;

    form.style.display = "block";

    form.querySelector("[name='save']").onclick = save;
    form.querySelector("[name='close']").onclick = cancel;
    form.querySelector("[name='delete']").onclick = remove;
};

gantt.hideLightbox = () => {
    getForm().style.display = "";
    currentTaskId = null;
};

function getForm() {
    return document.getElementById("my-form");
}

function save() {
    const task = gantt.getTask(currentTaskId);

    task.text = getForm().querySelector("[name='description']").value;

    if (task.$new) {
        delete task.$new;
        gantt.addTask(task, task.parent);
    } else {
        gantt.updateTask(task.id);
    }

    gantt.hideLightbox();
}

function cancel() {
    const task = gantt.getTask(currentTaskId);

    if (task.$new) {
        gantt.deleteTask(task.id);
    }

    gantt.hideLightbox();
}

function remove() {
    gantt.deleteTask(currentTaskId);
    gantt.hideLightbox();
}
~~~

2. 使用 [`onBeforeLightbox`](api/event/onbeforelightbox.md) 事件。在这种情况下，动作的算法如下：

- 检测灯箱即将显示
- 阻止默认灯箱
- 显示自定义表单并填写任务数据

~~~js
gantt.attachEvent("onBeforeLightbox", (id) => {
    const task = gantt.getTask(id);

    if (task.$new) {
        dhtmlx.confirm({
            text: "Create task?",
            callback: (confirmed) => {
                if (confirmed) {
                    //..apply values
                    delete task.$new;
                    gantt.addTask(task);
                } else {
                    gantt.deleteTask(task.id);
                }
            }
        });

        return false;
    }

    return true;
});
~~~

## 在自定义表单中处理操作

当用户保存表单时，你需要手动获取表单值并使用公开 API 更新相应的任务：[`addTask()`](api/method/addtask.md)、[`updateTask()`](api/method/updatetask.md) 和 [`deleteTask()`](api/method/deletetask.md)。

请注意，当灯箱由新任务触发，例如通过点击“+”按钮，如果用户点击“取消”以撤销任务创建，任务对象将设置 '$new' 属性。

你可以按以下示例处理灯箱关闭。动作类型“save”、“cancel”或“delete”作为名为 "action" 的参数传递：

~~~js
switch (action) {
    case "save":
        task.text = ""; // 从表单应用值

        // 添加一个新任务或更新现有任务。
        if (task.$new) {
            delete task.$new;
            gantt.addTask(task, task.parent);
        } else {
            gantt.updateTask(id);
        }

        break;
    case "cancel":
        // 如果用户取消创建新任务，删除它。
        if (task.$new) {
            gantt.deleteTask(id);
        }

        break;
    case "delete":
        gantt.deleteTask(id);
        break;
}
~~~