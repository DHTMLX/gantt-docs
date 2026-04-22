---
title: "Контрол ресурсов"
sidebar_label: "Контрол ресурсов"
---

# Управление ресурсами

:::info
Эта функциональность доступна только в PRO-версии.
:::

Сложный элемент управления, используемый для [назначения нескольких ресурсов и их количества для задачи](guides/resource-management.md#assigningresources).

![Параметры сервера управления ресурсами](/img/resources_control.png)

~~~js
gantt.config.lightbox.sections = [
 { name: "description", height: 38, map_to: "text", type: "textarea", focus: true},
 { name: "owner", height: 60, type: "resources", default_value: 8},   /*!*/
 { name: "time", type: "duration", map_to: "auto"}
];
~~~


[Назначить несколько ресурсов](https://docs.dhtmlx.com/gantt/samples/11_resources/07_assign_multiple_resources.html)


или

![Параметры управления ресурсами](/img/resources_control2.png)

~~~js
gantt.config.lightbox.sections = [
  { name: "description", height: 38, map_to:"text", type: "textarea", focus: true },
  { name: "time", type: "duration", map_to: "auto" },
  { name: "rooms", type: "resources", map_to: "rooms", options: [  /*!*/
  	  { key: 1, label: "room 1", unit: "hours" },    /*!*/
	  { key: 2, label: "room 2", unit: "hours" },   /*!*/
	  { key: 3, label: "room 3", unit: "hours" }   /*!*/
    ]  /*!*/
  }	   /*!*/
];

gantt.locale.labels.section_rooms = "Rooms";
~~~


[Управление ресурсами](https://docs.dhtmlx.com/gantt/samples/05_lightbox/13_resources.html)


:::note
Вы также можете создать [пользовательский элемент управления для назначения несколькими ресурсами задачи](guides/custom-editor.md#customthirdpartyeditor).
:::

## Инициализация

Чтобы добавить контроль **ресурсов** в lightbox, выполните следующие шаги:

1. Добавьте секцию в конфигурацию lightbox:

~~~js
gantt.config.lightbox.sections = [
  { name: "description", height: 38, map_to: "text", type: "textarea", focus: true },
  { name: "time", type: "duration", map_to: "auto" },
  { name: "rooms", type:"resources" }	   /*!*/
];
~~~

2. Установите подпись для секции:

~~~js
gantt.locale.labels.section_resources = "Rooms";
~~~


[Управление ресурсами](https://docs.dhtmlx.com/gantt/samples/05_lightbox/13_resources.html)


## Свойства

Следующие свойства в основном важны и обычно задаются для элемента управления **ресурсы** (см. полный список [здесь](api/config/lightbox.md)):

- **name** - (*string*) имя секции 
- **map_to** - (*string*) имя свойства данных, которое будет сопоставлено с секцией
- **type** - (*string*) тип [контрола секции](guides/default-edit-form.md#lightboxcontrols)
- **options** - (*array*) массив объектов. Определяет варианты выбора элемента управления (*используется для контролов **select**, **checkbox**,**radio** и **resources**  контролов*). 
Каждый объект в массиве задаёт один вариант и включает следующие свойства:
    - **key** - (*string*) идентификатор варианта. Этот атрибут сравнивается с свойством данных задачи для назначения вариантов
    - **label** - (*string*) метка варианта
    - **unit** - (*number*) единица измерения ресурса
- **focus** - (*boolean*) если установлено в *true*, секция получит фокус при открытии lightbox
- **default_value** - (*any*) значение по умолчанию для управления секцией. Применяется, если значение ресурса неопределено. Каждый вариант из массива **options** может иметь своё собственное значение по умолчанию.

:::note
По умолчанию управление ресурсами сопоставляется со свойством, указанным в конфигурации [resource_property](api/config/resource_property.md), поэтому опцию **map_to** можно опустить.
:::
:::note
По умолчанию управление ресурсами автоматически заполняется из [хранилища ресурсов](guides/resource-management.md#working-with-resource-view-panel) через коллекцию `gantt.serverList("resourceOptions")` [collection](api/method/serverlist.md). Нужно явно задавать список опций вручную только в том случае, если вы хотите изменить поведение по умолчанию.
:::

## Заполнение контроля данными

Начиная с версии v8.0, контроль ресурсов по умолчанию получает опции из [хранилища ресурсов](guides/resource-management.md#working-with-resource-view-panel).

Если вы используете стандартное хранилище ресурсов, созданное Gantt, управление ресурсами, инициализированное без параметра **options**, будет подключено к коллекции **gantt.serverList("resourceOptions")**. Эта коллекция будет заполнена ресурсами из хранилища ресурсов. Вы можете получить доступ к опциям с помощью кода:

~~~js
const options = gantt.serverList("resourceOptions");
~~~

Обратите внимание, массив опций будет пуст до загрузки ресурсов в хранилище.

Вы также можете обновить эту коллекцию, используя произвольный список опций:

~~~js
gantt.updateCollection("resourceOptions", [...]);
~~~

Обратите внимание, что если вы загрузите ресурсы в gantt после этого, gantt обновит эту коллекцию и перезапишет ваши изменения.

Если вы хотите контролировать, какие ресурсы попадают в lightbox, вы можете переопределить конфигурацию **gantt.config.resources.lightbox_resources**:

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

Если вы создаёте хранилище ресурсов вручную, вам нужно заполнить управление ресурсами опциями самостоятельно.

Обычно для задания значений для управления **ресурсами** используйте параметр [options](api/config/lightbox.md):

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

Элементы в параметре [options](api/config/lightbox.md) имеют 3 обязательных свойства:

- **key** - идентификатор варианта
- **label** - метка варианта
- **unit** - единица измерения ресурса


## Заполнение данных с сервера

Чтобы заполнить контроль данными с сервера, задайте параметр [options](api/config/lightbox.md) значением, возвращаемым методом [serverList](api/method/serverlist.md):

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


Содержимое `gantt.serverList("resourceOptions")` может быть определено, когда опции становятся доступными, с использованием метода [updateCollection](api/method/updatecollection.md):

~~~js
gantt.updateCollection("resourceOptions", [
    { key: 1, label: "room 1", unit: "hours" },
    { key: 2, label: "room 2", unit: "hours" },
    { key: 3, label: "room 3", unit: "hours" }
])
~~~


[Назначить несколько ресурсов](https://docs.dhtmlx.com/gantt/samples/11_resources/07_assign_multiple_resources.html)