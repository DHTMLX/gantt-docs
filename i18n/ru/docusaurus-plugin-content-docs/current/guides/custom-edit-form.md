---
title: "Кастомный Lightbox"
sidebar_label: "Кастомный Lightbox"
---

# Кастомный Lightbox

## Способы создания кастомного lightbox

Можно создать полностью кастомный lightbox для Gantt и заменить им стандартный. Существует два основных подхода:

1) Путём переопределения метода @[showLightbox](api/method/showlightbox.md):

~~~js
gantt.showLightbox = function(id){
    // код кастомной формы
}
~~~

- id - (string/number) - id задачи

Также для реализации lightbox доступен метод @[hideLightbox](api/method/hidelightbox.md).


Определим HTML-контейнер "my-form" для размещения кастомного lightbox:

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


Для создания кастомного lightbox можно использовать следующую конфигурацию:


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

2) Использование события @[onBeforeLightbox](api/event/onbeforelightbox.md). Этот подход включает:

- определение момента, когда lightbox должен открыться
- предотвращение отображения стандартного lightbox
- показ кастомной формы и заполнение её данными задачи


~~~js
gantt.attachEvent("onBeforeLightbox", function(id) {
    var task = gantt.getTask(id);
    if(task.$new){
        dhtmlx.confirm({
            text:"Create task?",
            callback: function(res){
                if(res){
                    //..применить значения
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

## Обработка действий в кастомной форме

При сохранении формы необходимо вручную получить значения из формы и обновить соответствующую задачу с помощью публичного API: @[addTask](api/method/addtask.md), @[updateTask](api/method/updatetask.md) и @[deleteTask](api/method/deletetask.md).

Обратите внимание, что если lightbox был вызван для новой задачи (например, при нажатии на кнопку 'plus'), и пользователь нажал 'Cancel' для отмены создания задачи, в объекте задачи будет установлено свойство '$new'.

Обработка закрытия lightbox может быть реализована, как показано в примере ниже. Тип действия - 'save', 'cancel' или 'delete' - передаётся в параметре "action":

~~~js
switch(action){
   case "save":
      task.text = '';// применить значения из формы

      // добавить новую задачу или обновить существующую
      if(task.$new){
        delete task.$new;
        gantt.addTask(task,task.parent)
      }else{
        gantt.updateTask(id);
      }

      break;
   case "cancel":
      // если отменяется создание новой задачи - удалить её, иначе ничего не делать
      if(task.$new)
         gantt.deleteTask(id);
      break;
   case "delete":
      gantt.deleteTask(id);
      break;
}
~~~

