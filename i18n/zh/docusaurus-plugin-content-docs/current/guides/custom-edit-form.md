---
title: "自定义 Lightbox"
sidebar_label: "自定义 Lightbox"
---

自定义 Lightbox
===============

创建自定义 Lightbox 的方法
----------------------------

可以为 gantt 创建完全自定义的 lightbox，并替换默认的 lightbox。主要有两种方法:

1）通过重写 @[showLightbox](api/method/showlightbox.md) 方法:

~~~js
gantt.showLightbox = function(id){
    // 自定义表单的代码
}
~~~

- id - (string/number) - 任务 id

同时也可以使用 @[hideLightbox](api/method/hidelightbox.md) 方法来辅助实现 lightbox。

我们先定义一个 HTML 容器 "my-form" 来承载自定义的 lightbox:

~~~html
<div id="my-form">
 <label for="description">Task text
  <input type="text" name="description" value="" >
 </label>
 


 <input type="button" name="save" value="Save">
 <input type="button" name="close" value="Close">
 <input type="button" name="delete" value="Delete">
</div>
~~~

要创建自定义 lightbox，可以使用如下配置:

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

2）使用 @[onBeforeLightbox](api/event/onbeforelightbox.md) 事件。这种方式包括:

- 检测 lightbox 即将打开的时机
- 阻止默认的 lightbox 显示
- 显示自定义表单，并填充任务数据

~~~js
gantt.attachEvent("onBeforeLightbox", function(id) {
    var task = gantt.getTask(id);
    if(task.$new){
        dhtmlx.confirm({
            text:"Create task?",
            callback: function(res){
                if(res){
                    //..应用表单中的值
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

在自定义表单中处理操作
-----------------------

当保存表单时，需要手动获取表单的值，并通过公开 API 更新对应的任务:@[addTask](api/method/addtask.md)、@[updateTask](api/method/updatetask.md) 和 @[deleteTask](api/method/deletetask.md)。

请注意，如果 lightbox 是由新建任务触发的（比如点击"加号"按钮），并且用户点击"Cancel"撤销了任务创建，则任务对象会有 '$new' 属性。

可以按照下面的示例处理 lightbox 的关闭。操作类型 -- 'save'、'cancel' 或 'delete' -- 作为 "action" 参数传递:

~~~js
switch(action){
   case "save":
      task.text = '';// 从表单中应用值

      // 新增任务或更新已有任务
      if(task.$new){
        delete task.$new;
        gantt.addTask(task,task.parent)
      }else{
        gantt.updateTask(id);
      }

      break;
   case "cancel":
      // 如果是撤销新建任务，则删除该任务；否则无需操作
      if(task.$new)
         gantt.deleteTask(id);
      break;
   case "delete":
      gantt.deleteTask(id);
      break;
}
~~~

