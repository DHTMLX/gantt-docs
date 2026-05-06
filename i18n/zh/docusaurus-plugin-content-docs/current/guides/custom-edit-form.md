---
title: "自定义灯箱"
sidebar_label: "自定义灯箱"
---

# 自定义灯箱

## 创建自定义灯箱的方式

你可以为甘特图创建一个完全自定义的灯箱，并用它替换默认的灯箱。共有两种实现方式：

1) 通过重新定义 [showLightbox](api/method/showlightbox.md) 方法：

~~~js
gantt.showLightbox = function(id){
    // code of the custom form
}
~~~

- id - (string/number) - 任务 ID

还有 [hideLightbox](api/method/hidelightbox.md) 方法，可以在灯箱实现中帮助到你。

让我们创建一个 HTML 容器 "my-form"，将在其中放置自定义灯箱：

~~~html
<div id="my-form">
 <label for="description">任务文本
  <input type="text" name="description" value="" >
 </label>
 

 
 <input type="button" name="save" value="Save">
 <input type="button" name="close" value="Close">
 <input type="button" name="delete" value="Delete">
</div>
~~~


然后要创建自定义灯箱，可以使用如下配置：


~~~js
var taskId = null;

gantt.showLightbox = function(id) {
    taskId = id;
    var task = gantt.getTask(id);

    var form = getForm();
    var input = form.querySelector("[name='description']");
    input.focus();
    input.value = task.text;

    form.style.display = "block";

    form.querySelector("[name='save']").onclick = save;
    form.querySelector("[name='close']").onclick = cancel;
    form.querySelector("[name='delete']").onclick = remove;
};

gantt.hideLightbox = function(){
    getForm().style.display = "";
    taskId = null;
}


function getForm() {
    return document.getElementById("my-form");
};

function save() {
    var task = gantt.getTask(taskId);

    task.text = getForm().querySelector("[name='description']").value;

    if(task.$new){
        delete task.$new;
        gantt.addTask(task,task.parent);
    }else{
        gantt.updateTask(task.id);
    }

    gantt.hideLightbox();
}

function cancel() {
    var task = gantt.getTask(taskId);

    if(task.$new)
    gantt.deleteTask(task.id);
    gantt.hideLightbox();
}

function remove() {
    gantt.deleteTask(taskId);
    gantt.hideLightbox();
}
~~~

2) 使用 [onBeforeLightbox](api/event/onbeforelightbox.md) 事件。在这种情况下，动作的算法如下：

- 检测灯箱即将显示
- 阻止默认灯箱
- 显示自定义表单并填写任务数据。


~~~js
gantt.attachEvent("onBeforeLightbox", function(id) {
    var task = gantt.getTask(id);
    if(task.$new){
        dhtmlx.confirm({
            text:"Create task?",
            callback: function(res){
                if(res){
                    //..apply values
                    delete task.$new;
                    gantt.addTask(task);
                }else{
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

当用户保存表单时，你需要手动获取表单值并使用公共 API 更新相应的任务：[addTask](api/method/addtask.md)、[updateTask](api/method/updatetask.md) 和 [deleteTask](api/method/deletetask.md)。

请注意，当灯箱由新任务触发（点击“plus”按钮）时，如果用户点击“Cancel”以撤销任务创建，应将任务对象的 '$new' 属性设置。
你可以按下例处理灯箱关闭。一个操作的类型 - 'save'、'cancel' 或 'delete' 将作为 "action" 参数传入：


~~~js
switch(action){
   case "save":
      task.text = '';// apply values from form

      // add new task or update already existing one
      if(task.$new){
        delete task.$new;
        gantt.addTask(task,task.parent)
      }else{
        gantt.updateTask(id);
      }

      break;
   case "cancel":
      // if cancel popup for creating a new task - delete it, otherwise do nothing
      if(task.$new)
         gantt.deleteTask(id);
      break;
   case "delete":
      gantt.deleteTask(id);
      break;
}
~~~