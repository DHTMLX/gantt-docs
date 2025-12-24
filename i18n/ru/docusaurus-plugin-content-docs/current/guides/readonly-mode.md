---
title: "Режим только для чтения"
sidebar_label: "Режим только для чтения"
---

# Режим только для чтения


В этом разделе рассмотрим режим только для чтения в двух сценариях:

1. [Режим только для чтения для всего Gantt](guides/readonly-mode.md#readonlymodefortheentiregantt)
2. [Режим только для чтения для отдельных задач](guides/readonly-mode.md#readonlymodeforspecifictaskslinks)


## Режим только для чтения для всего Gantt {#readonlymodefortheentiregantt}

Чтобы сделать весь Gantt только для чтения, просто установите опцию [readonly](api/config/readonly.md) в *true*.

~~~js
gantt.config.readonly = true;

gantt.init("gantt_here");
~~~

Имейте в виду, что режим только для чтения отключает только встроенные действия, которые пользователь может выполнять через интерфейс. Это значит, что когда весь Gantt заблокирован, пользователи не смогут открывать lightbox или inline-редактор, перемещать задачи или изменять их размер.

Однако свойство [readonly](api/config/readonly.md) не блокирует действия, выполняемые через API. Поэтому, если вы используете API Gantt, вам потребуется вручную проверять, включён ли режим только для чтения, внутри своих callback-функций. Например, вот как можно предотвратить добавление задач при клике на пользовательскую кнопку:

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


Чтобы оставить отдельные задачи или связи редактируемыми даже при включённом режиме только для чтения для всего Gantt, добавьте свойство 'editable' в объект данных задачи или связи и установите его в *true*:

![task_editable_property](/img/task_editable_property.png)

~~~js
gantt.config.readonly = true;
var task = gantt.getTask(id).editable = true;
~~~

По умолчанию это поведение связано со свойством 'editable' задачи или связи. Если вы хотите использовать другое свойство, вы можете изменить его с помощью опции [editable_property](api/config/editable_property.md):

~~~js
gantt.config.editable_property = "property_name";
~~~


## Режим только для чтения для отдельных задач/связей {#readonlymodeforspecifictaskslinks}

Чтобы сделать определённые задачи или связи только для чтения, добавьте свойство 'readonly' в их объекты данных и установите его в true:

~~~js
gantt.getTask(id).readonly = true;
gantt.getLink(id).readonly = true;
~~~

![task_readonly_property](/img/task_readonly_property.png)

:::note
По умолчанию Gantt проверяет, установлено ли у задачи или связи это свойство в истинное значение, и делает её только для чтения. В противном случае она остаётся доступной для редактирования.
:::

Когда задача или связь находится в режиме только для чтения, она не будет реагировать на клики или двойные клики, а также её нельзя будет перетаскивать или редактировать.

Если вы хотите показывать lightbox для задач только для чтения, вы можете вызвать его вручную с помощью [gantt.showLightbox(id)](api/method/showlightbox.md):

~~~js
gantt.attachEvent("onTaskDblClick", function(id,e){
    gantt.showLightbox(id)
    return true;
});
~~~

По умолчанию поведение только для чтения связано со свойством 'readonly' задачи или связи. Но вы можете изменить это свойство с помощью опции [readonly_property](api/config/readonly_property.md):

~~~js
gantt.config.readonly_property = "property_name";
~~~


## Подробнее о параметре "editable_property"


Свойство 'editable_property' указывает на свойство самого объекта данных задачи, а не на секцию lightbox или колонку в левом гриде:

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

Если вы хотите сделать это свойство редактируемым из lightbox, установите 'editable_property' в то же значение, на которое настроен контрол:

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


## Установка read-only события на основе нескольких свойств


Чтобы сделать события редактируемыми на основании нескольких условий, вы можете:

- управлять возможностью редактирования вручную, блокируя события [onBeforeLightbox](api/event/onbeforelightbox.md) и [onBeforeTaskDrag](api/event/onbeforetaskdrag.md)
- обновлять свойство 'editable_property' динамически при загрузке, создании или обновлении задач (используя [onTaskLoading](api/event/ontaskloading.md), [onTaskCreated](api/event/ontaskcreated.md), [onAfterTaskUpdate](api/event/onaftertaskupdate.md)):

~~~js
gantt.attachEvent("onTaskLoading", function(task){
    task.editable = task.has_owner && task.editable && task.text;
    return true;
});
~~~

