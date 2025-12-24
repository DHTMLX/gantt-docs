---
title: "Валидация"
sidebar_label: "Валидация"
---

# Валидация


Валидация помогает обеспечить точность данных, вводимых пользователями, и предотвращает сохранение некорректных значений. Например, это может предотвратить назначение двух задач одному сотруднику в одно и то же время.

Обычно валидация данных выполняется с помощью событий из [dhtmlxGantt API](api/overview/events-overview.md), которые позволяют перехватывать и проверять корректность вводимых данных:

## Валидация на клиенте


Следующие события являются ключевыми и часто используются для валидации данных:

- [onLightboxSave](api/event/onlightboxsave.md) - срабатывает, когда пользователь нажимает кнопку 'Save' в lightbox
- [onBeforeTaskAdd](api/event/onbeforetaskadd.md) - срабатывает перед добавлением новой задачи в Gantt
- [onBeforeTaskChanged](api/event/onbeforetaskchanged.md) - срабатывает перед обновлением задачи
- [onBeforeLinkAdd](api/event/onbeforelinkadd.md) - срабатывает перед добавлением новой связи в Gantt
- [onBeforeLinkUpdate](api/event/onbeforelinkupdate.md) - срабатывает перед обновлением связи

Самый простой способ реализовать валидацию - использовать событие [onLightboxSave](api/event/onlightboxsave.md). Это событие возникает при нажатии пользователем кнопки 'Save' в форме. Возвращение *true* позволяет сохранить изменения, а *false* отменяет процесс и оставляет lightbox открытым.

Например, чтобы запретить сохранение задачи без назначенного пользователя, вы можете использовать следующий код:

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


## Валидация на сервере


Одно из ограничений описанного выше подхода заключается в том, что событие не срабатывает, если изменения вносятся через inline-редактирование или перетаскивание задач в Gantt.

Чтобы охватить все изменения - включая редактирование, создание и удаление - используйте объект [dataProcessor](guides/server-side.md), в частности его событие [onBeforeUpdate](https://docs.dhtmlx.com/api__dataprocessor_onbeforeupdate_event.html). Это событие возникает перед отправкой данных на сервер и после любого изменения в Gantt, независимо от способа его внесения.

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
 
Пояснения к параметрам:

- **id** - (*string*) идентификатор задачи.
- **status** - (*'updated', 'inserted', 'deleted'*) статус операции над задачей.
- **data** - (*object*) данные, которые будут отправлены.

Имейте в виду: если поле не проходит валидацию, изменения не отправляются на сервер, а остаются на стороне клиента, что позволяет обработать их дополнительно.

