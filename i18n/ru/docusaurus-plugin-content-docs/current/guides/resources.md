---
title: "Контрол ресурсов"
sidebar_label: "Контрол ресурсов"
---

# Контрол ресурсов


:::info
Эта функция доступна только в PRO-версии.
:::

Это многофункциональный контрол, предназначенный для [назначения нескольким ресурсам и их количествам задачи](guides/resource-management.md#assigningresources).

![Опции контрола ресурсов на сервере](/img/resources_control.png)

~~~js
gantt.config.lightbox.sections = [
 {name: "description", height: 38, map_to: "text", type: "textarea", focus: true},
 {name:"owner",height:60, type:"resources", default_value:8},   /*!*/
 {name: "time", type: "duration", map_to: "auto"}
];
~~~


[Assign multiple resources](https://docs.dhtmlx.com/gantt/samples/11_resources/07_assign_multiple_resources.html)


Альтернативный вариант:

![Опции контрола ресурсов](/img/resources_control2.png)

~~~js
gantt.config.lightbox.sections = [
  { name:"description",height:38,map_to:"text",type:"textarea",focus:true },
  { name:"time",type:"duration",map_to:"auto" },
  { name:"rooms",type:"resources",map_to:"rooms", options:[  /*!*/
        { key: 1, label: "room 1", unit: "hours" },    /*!*/
      { key: 2, label: "room 2", unit: "hours" },   /*!*/
      { key: 3, label: "room 3", unit: "hours" }   /*!*/
    ]  /*!*/
  }       /*!*/
];

gantt.locale.labels.section_rooms = "Rooms";
~~~


[Resources control](https://docs.dhtmlx.com/gantt/samples/05_lightbox/13_resources.html)


:::note
Также возможно создать [кастомный контрол для назначения нескольких ресурсов задаче](guides/custom-editor.md#customthirdpartyeditor).
:::

## Инициализация


Чтобы добавить контрол **resources** в lightbox, выполните следующие шаги:

1. Добавьте секцию в конфигурацию lightbox:

~~~js
gantt.config.lightbox.sections = [
  { name:"description",height:38,map_to:"text",type:"textarea",focus:true },
  { name:"time",type:"duration",map_to:"auto" },
  { name:"rooms",type:"resources" }       /*!*/
];
~~~

2. Задайте метку для секции:

~~~js
gantt.locale.labels.section_resources = "Rooms";
~~~


[Resources control](https://docs.dhtmlx.com/gantt/samples/05_lightbox/13_resources.html)


## Свойства


Ниже приведены основные свойства, которые обычно задаются для контрола **resources** (полный список доступен [здесь](api/config/lightbox.md)):

- **name** - (*string*) имя секции 
- **map_to** - (*string*) имя свойства данных, связанного с секцией
- **type** - (*string*) тип контрола для [секции](guides/default-edit-form.md#lightboxcontrols)
- **options** - (*array*) массив объектов, определяющих варианты выбора контрола (*используется с контролами **select**, **checkbox**, **radio** и **resources***). Каждый объект включает:
    - **key** - (*string*) id опции, сопоставляется со свойством данных задачи
    - **label** - (*string*) подпись опции
    - **unit** - (*number*) единица измерения ресурса
- **focus** - (*boolean*) если true, секция получает фокус при открытии lightbox
- **default_value** - (*any*) значение по умолчанию для контрола, используется если значение ресурса не определено. Для каждой опции может быть задано своё значение по умолчанию.

:::note
По умолчанию контрол ресурсов связывается со свойством, определённым в [resource_property](api/config/resource_property.md), поэтому указывать **map_to** необязательно.
:::
:::note
По умолчанию контрол ресурсов автоматически заполняется из [хранилища ресурсов](guides/resource-management.md#workingwithresourceviewpanel) через коллекцию `gantt.serverList("resourceOptions")` ([подробнее](api/method/serverlist.md)). Необходимо задавать опции вручную только для переопределения этого поведения.
:::

## Заполнение контрола данными


Начиная с версии 8.0, контрол ресурсов автоматически получает опции из [хранилища ресурсов](guides/resource-management.md#workingwithresourceviewpanel).

Если вы используете стандартное хранилище ресурсов Gantt, [контрол ресурсов](guides/resources.md), инициализированный без параметра **options**, будет связан с коллекцией **gantt.serverList("resourceOptions")**, которая наполняется ресурсами из хранилища. Получить опции в коде можно так:

~~~js
const options = gantt.serverList("resourceOptions");
~~~

Имейте в виду, что массив опций будет пустым, пока ресурсы не будут загружены в хранилище.

Также вы можете обновить эту коллекцию своим списком опций:

~~~js
gantt.updateCollection("resourceOptions", [...]);
~~~

Обратите внимание, что если вы загрузите ресурсы в Gantt после обновления этой коллекции, ваши изменения будут перезаписаны.

Чтобы управлять тем, какие ресурсы отображаются в lightbox, переопределите конфиг **gantt.config.resources.lightbox_resources**:

~~~js
gantt.config.resources = {
    lightbox_resources: function selectResourceControlOptions(resources){
          const lightboxOptions = [];
          resources.forEach(function(res) {
             if (!gantt.$resourcesStore.hasChild(res.id)) {
                const copy = gantt.copy(res);
                copy.key = res.id;
                copy.label = res.text;
                lightboxOptions.push(copy);
             }
          });
          return lightboxOptions;
       }
};
~~~

Если вы создаёте хранилище ресурсов вручную, необходимо самостоятельно заполнить опции для контрола ресурсов.

Обычно для задания значений для контрола **resources** используется параметр [options](api/config/lightbox.md):

~~~js
gantt.config.lightbox.sections = [
    { name:"rooms",type:"resources",map_to:"rooms",
        options:[
            { key: 1, label: "room 1", unit: "hours" },
            { key: 2, label: "room 2", unit: "hours" },
            { key: 3, label: "room 3", unit: "hours" }
        ]
    }
];
~~~

Каждый элемент массива [options](api/config/lightbox.md) должен содержать:

- **key** - id опции
- **label** - подпись опции
- **unit** - единица измерения ресурса


## Заполнение контрола данными с сервера


Чтобы заполнить контрол данными с сервера, установите свойство [options](api/config/lightbox.md) в значение, возвращаемое методом [serverList](api/method/serverlist.md):

~~~js
gantt.config.lightbox.sections = [
 {name: "description", height: 38, map_to: "text", type: "textarea", focus: true},
 {name: "resources", type: "resources", map_to: "owner_id", default_value:8,
     options: gantt.serverList("resourceOptions")},
 {name: "time", type: "duration", map_to: "auto"}
];

gantt.init("gantt_here");
gantt.load("/data");
~~~


Содержимое `gantt.serverList("resourceOptions")` можно задать, когда опции станут доступны, с помощью метода [updateCollection](api/method/updatecollection.md):

~~~js
gantt.updateCollection("resourceOptions", [
    { key: 1, label: "room 1", unit: "hours" },
    { key: 2, label: "room 2", unit: "hours" },
    { key: 3, label: "room 3", unit: "hours" }
])
~~~


[Assign multiple resources](https://docs.dhtmlx.com/gantt/samples/11_resources/07_assign_multiple_resources.html)

