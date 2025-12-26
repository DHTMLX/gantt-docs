---
title: "Обработка событий"
sidebar_label: "Обработка событий"
---

# Обработка событий

События являются ключевыми для создания интерактивной и отзывчивой страницы в ответ на действия пользователя.

Каждый раз, когда пользователь взаимодействует с диаграммой Gantt, dhtmlxGantt вызывает событие. Эти события можно использовать для определения произошедших действий и выполнения соответствующего кода.

## Привязка событий

Для добавления обработчика события используйте метод [attachEvent](api/method/attachevent.md).

~~~js
gantt.attachEvent("onTaskClick", function(id, e) {
    alert("You've just clicked an item with id="+id);
});
~~~

[D'n'D Events](https://docs.dhtmlx.com/gantt/samples/08_api/01_dnd_events.html)


**Обратите внимание:**

- Названия событий не чувствительны к регистру.
- К одному событию можно привязать несколько обработчиков.

## Отвязка событий

Для удаления обработчика события используйте метод [detachEvent](api/method/detachevent.md):

[Общий способ привязки/отвязки обработчика события](Общий способ привязки/отвязки обработчика события)
~~~js
// для привязки события
var eventId = gantt.attachEvent("onTaskClick", function(id, e) {
    alert("You've just clicked an item with id="+id);
});
// для отвязки события
gantt.detachEvent(eventId);/*!*/
~~~

Если необходимо удалить все обработчики сразу, используйте следующий подход:

~~~js
// сохранение id обработчиков при их привязке
var events = [];
events.push(gantt.attachEvent("onTaskClick", function(id, e) {
    alert("You've just clicked an item with id="+id);
});
events.push(gantt.attachEvent("onTaskDblClick", function(id, e) {
    alert("You've just double clicked an item with id="+id);
});
 
// отвязка всех сохранённых обработчиков
while (events.length)
   gantt.detachEvent(events.pop()); /*!*/
~~~

## Проверка наличия обработчика

Чтобы проверить, есть ли у определённого события привязанные обработчики, используйте метод [checkEvent](api/method/checkevent.md):

~~~js
gantt.attachEvent("onTaskClick", function(id, e) {
    alert("You've just clicked a task with id="+id);
});
 
gantt.checkEvent("onTaskClick"); //возвращает 'true' /*!*/
~~~

## Отменяемые события

События, начинающиеся с 'onbefore', могут быть отменены.

Чтобы отменить такое событие, необходимо вернуть **false** из обработчика события.

**Отмена выполнения обработчика**
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


## Доступ к объекту gantt внутри обработчика

Внутри обработчика события объект gantt доступен через ключевое слово **this**. <br/>

**Обращение внутри обработчика события**
~~~js
gantt.attachEvent("onTaskClick", function(id, e){
    parentId = this.getTask(id).parent;
});
~~~

