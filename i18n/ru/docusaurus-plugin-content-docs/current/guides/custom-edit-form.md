---
title: "Настраиваемый Lightbox"
sidebar_label: "Настраиваемый Lightbox"
---

# Настраиваемый Lightbox

## Способы создания настраиваемого Lightbox

Вы можете создать полностью настраиваемый Lightbox для Gantt и заменить им дефолтную реализацию. Есть два возможных способа сделать это:

1) Переопределив метод [showLightbox](api/method/showlightbox.md):

~~~js
gantt.showLightbox = function(id){
    // code of the custom form
}
~~~

- id - (string/number) - идентификатор задачи

Также существует метод [hideLightbox](api/method/hidelightbox.md), который поможет в реализации Lightbox.

Давайте создадим HTML-контейнер "my-form", в который поместим наш настраиваемый Lightbox:

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

Затем, чтобы сделать настраиваемый Lightbox, можно использовать конфигурацию, похожую на следующую:

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

2) Использование события [onBeforeLightbox](api/event/onbeforelightbox.md). В этом случае алгоритм действий следующий:

- определить момент, когда Lightbox собирается быть показан
- заблокировать стандартный Lightbox
- показать настраиваемую форму и заполнить данные задачи.

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

## Обработка действий в настраиваемой форме

Когда пользователь saves форму, вам нужно будет вручную получить значения формы и обновить соответствующую задачу с использованием публичного API: [addTask](api/method/addtask.md), [updateTask](api/method/updatetask.md) и [deleteTask](api/method/deletetask.md).

Обратите внимание, что когда Lightbox вызывается для новой задачи (при нажатии на кнопку 'плюс'), которая должна быть удалена, если пользователь нажимает 'Cancel' для отката создания задачи, у объекта задачи будет установлено свойство '$new'.

Вы можете обрабатывать закрытие Lightbox, как показано в примере ниже. Тип действия — 'save', 'cancel' или 'delete' передаётся как параметр "action":

~~~js
switch(action){
   case "save":
      task.text = '';// применить значения из формы

      // добавить новую задачу или обновить уже существующую
      если(task.$new){
        delete task.$new;
        gantt.addTask(task,task.parent)
      }else{
        gantt.updateTask(id);
      }

      break;
   case "cancel":
      // если отмена для создания новой задачи - удалить её, иначе ничего не делать
      if(task.$new)
         gantt.deleteTask(id);
      break;
   case "delete":
      gantt.deleteTask(id);
      break;
}
~~~