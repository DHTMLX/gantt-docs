---
title: "Режим только для чтения"
sidebar_label: "Режим только для чтения"
---

# Режим только для чтения

В этой части мы рассмотрим режим только для чтения в контексте двух ситуаций:

1. [Режим только для чтения для всего Gantt-чарта](guides/readonly-mode.md#readonlymodefortheentiregantt)
2. [Режим только для чтения для конкретных задач/ссылок](guides/readonly-mode.md#readonlymodeforspecifictaskslinks)

## Режим только для чтения для всего Gantt-чарта {#readonlymodefortheentiregantt}

Чтобы сделать весь Gantt-чарт доступным только для чтения, установите опцию [readonly](api/config/readonly.md) в значение *true*.

~~~js
gantt.config.readonly = true;

gantt.init("gantt_here");
~~~

Следует понимать, что режим только для чтения затрагивает только встроенные действия, которые пользователи могут выполнять через UI. Это означает, что когда весь Gantt-чарт не редактируем, пользователи не смогут открыть lightbox или inline editor, не смогут перетаскивать задачи вертикально или горизонтально, или изменять размер задач.

Но свойство [readonly](api/config/readonly.md) не блокирует действия, реализованные через методы API. Таким образом, если вы используете API Gantt, нужно вручную проверять, включён ли режим только для чтения в обратном вызове. Например, вот как можно запретить добавление задач через кликанье на кастомную кнопку:

~~~js
gantt.config.readonly = true;

gantt.config.columns = [
    { name: "text", label: "Task name", width: "*", tree: true },
    { name: "start_date", label: "Start time", align: "center" },
    { name: "duration", label: "Duration", align: "center" },
    { name: "add", label: "1", width: 44 },
    {
        name: "add_custom", label: "2", width: 44, template: function (task) {
          return "<div class='custom_add' onclick='customAdd(" + task.id + ")';></div>"
        }
    }
];

function customAdd(parentId) { /*!*/
    if (gantt.config.readonly){ /*!*/
        return; /*!*/
    }/*!*/
}/*!*/
~~~

Чтобы сделать конкретные задачи/ссылки редактируемыми в режиме чтения, добавьте свойство 'editable' в их данные и установите его значение в *true*:

![task_editable_property](/img/task_editable_property.png)

~~~js
gantt.config.readonly = true;
var task = gantt.getTask(id).editable = true;
~~~

По умолчанию указанное поведение привязано к свойству 'editable' задачи/ссылки. Вы можете изменить целевое свойство, используя конфигурационную опцию [editable_property](api/config/editable_property.md):

~~~js
gantt.config.editable_property = "property_name";
~~~


## Режим только для чтения для конкретных задач/ссылок {#readonlymodeforspecifictaskslinks}

Чтобы сделать конкретные задачи или ссылки доступными только для чтения, добавьте свойство 'readonly' к данным объектов и установите его в true:

~~~js
gantt.getTask(id).readonly = true;
gantt.getLink(id).readonly = true;
~~~

![task_readonly_property](/img/task_readonly_property.png)

:::note
По умолчанию gantt проверяет наличие у задачи/ссылки данного свойства и, если значение неотрицательное, делает задачу/ссылку доступной только для чтения. В противном случае элемент остаётся редактируемым.
:::

Когда задача/ссылка помечена как только для чтения, она не реагирует на клики, не реагирует на двойные клики, не перетаскивается и никак не редактируется.

Если вы хотите показать lightbox для задач в режиме чтения, можно вызвать его вручную с помощью [gantt.showLightbox(id)](api/method/showlightbox.md):

~~~js
gantt.attachEvent("onTaskDblClick", function(id,e){
    gantt.showLightbox(id)
    return true;
});
~~~

По умолчанию поведение в режиме чтения привязано к свойству 'readonly' задачи/ссылки. Но вы можете изменить целевое свойство, используя конфигурационную опцию [readonly_property](api/config/readonly_property.md):

~~~js
gantt.config.readonly_property = "property_name";
~~~


## Детали конфигурационной опции "editable_property"

Свойство 'editable_property' относится к свойству объекта данных задачи, а не к разделу lightbox или к колонке левой панели grid:

~~~js
{
    tasks:[
        {id:1, text:"Project #2", start_date:"01-04-2020", duration:18,order:10, 
            progress:0.4, parent:0, editable:false},
        {id:2, text:"Task #1", start_date:"02-04-2020", duration:8, order:10, 
            progress:0.6, parent:1, editable:true},
        {id:3, text:"Task #2", start_date:"11-04-2020", duration:8, order:20, 
            progress:0.6, parent:1, editable:true}
    ],
    links:[...]
}
~~~

Если вы хотите сделать это свойство настраиваемым через lightbox, нужно задать 'editable_property' равным той же свойствке, с которой сопоставлен контрол:

~~~js
gantt.config.lightbox.sections = [ 
    {
        name:"description", 
        height:38, 
        map_to:"some_property", 
        type:"textarea", 
        focus:true
    },
    ....
]
gantt.config.editable_property = "some_property";
~~~


## Установка редактируемости событий на основании нескольких свойств

Если вы хотите сделать события условно редактируемыми на основе набора свойств, вы можете:

- управлять их редактируемостью вручную, например, блокируя события [onBeforeLightbox](api/event/onbeforelightbox.md) и [onBeforeTaskDrag](api/event/onbeforetaskdrag.md)
- динамически обновлять 'editable_property' каждый раз, когда задача загружается, добавляется или обновляется ([onTaskLoading](api/event/ontaskloading.md), [onTaskCreated](api/event/ontaskcreated.md), [onAfterTaskUpdate](api/event/onaftertaskupdate.md)):

~~~js
gantt.attachEvent("onTaskLoading", function(task){
    task.editable = task.has_owner && task.editable && task.text;
    return true;
});
~~~