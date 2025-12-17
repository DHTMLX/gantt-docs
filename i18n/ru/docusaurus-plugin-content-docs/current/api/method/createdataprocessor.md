---
sidebar_label: createDataProcessor
title: createDataProcessor method
description: "Создаёт новый экземпляр dataProcessor и связывает его с gantt chart"
---

# createDataProcessor

### Description

@short: Создаёт новый экземпляр dataProcessor и связывает его с gantt chart

@signature: createDataProcessor: (config: DataProcessorConfig | RouterFunction | RouterConfig) =\> any

### Parameters

- `config` - (required) *DataProcessorConfig | RouterFunction | RouterConfig* -         объект конфигурации для dataProcessor

### Returns
- ` dataProcessor` - (object) - созданный экземпляр dataProcessor

### Example

~~~jsx
var dp = gantt.createDataProcessor({
   url: "/api",
   mode: "REST",
   deleteAfterConfirmation: true
});
~~~

### Related samples
- [Custom data api - using local storage](https://docs.dhtmlx.com/gantt/samples/08_api/22_data_processor.html)

### Details

Этот метод принимает один из следующих типов параметров:

- **DataProcessorConfig** - (*object*) - объект, задающий один из предустановленных режимов отправки данных
    - **_url_** - (*string*) - URL сервера
    - **_mode?_** - (*string*) - необязательный параметр, определяет способ отправки данных: "JSON" | "REST-JSON" | "JSON" | "POST" | "GET"
    - **_deleteAfterConfirmation?_** - (*boolean*) - необязательный параметр, определяет, будет ли задача удалена из gantt только после подтверждения удаления сервером. Зависимости и подзадачи удаляются после подтверждения удаления родительской задачи.


~~~js
var dp = gantt.createDataProcessor({
   url: "/api",
   mode: "REST",
   deleteAfterConfirmation: true
});
~~~


- **RouterFunction (entity, action, data, id): Promise | object | void** - функция роутинга для обработки изменений в Gantt chart
    - **_entity_** - (*string*) - имя сущности, например "task", "link", "resource" или "assignment"
    - **_action_** - (*string*) - тип действия: "create", "update" или "delete"
    - **_data_** - (*Task | Link | ResourceAssignment | CustomObject*) - обрабатываемый объект
    - **_id_** - (*string | number*) - id обрабатываемого объекта


~~~js
// entity - "task"|"link"|"resource"|"assignment"
// action - "create"|"update"|"delete"
// data - объект с данными задачи или связи
// id – id обрабатываемого объекта (задачи или связи)
var dp = gantt.createDataProcessor(function(entity, action, data, id) { 
    switch(action) {
        case "create":
           return gantt.ajax.post(
                server + "/" + entity,
                data
           );
        break;
        case "update":
           return gantt.ajax.put(
                 server + "/" + entity + "/" + id,
                 data
            );
        break;
        case "delete":
           return gantt.ajax.del(
                 server + "/" + entity + "/" + id
           );
         break;
   }
});
~~~


- **RouterConfig** - (*object*) - объект конфигурации роутеров для разных сущностей
    - **_task?_** - (*RouterForEntity*) - роутер для задач
    - **_link?_** - (*RouterForEntity*) - роутер для связей
    - **_resource?_** - (*RouterForEntity*) - роутер для ресурсов
    - **_assignment?_** - (*RouterForEntity*) - роутер для назначений


Объект **RouterForEntity** включает следующие методы:

- **create (data): Promise** - функция для обработки добавления элементов
    - **_data_** - (*Task | Link | ResourceAssignment | CustomObject*) - добавляемый элемент
- **update (data, id): Promise** - функция для обработки обновления элементов
    - **_data_** - (*Task | Link | ResourceAssignment | CustomObject*) - обновляемый элемент
    - **_id_** - (*string | number*) - id элемента
- **delete (id): Promise** - функция для обработки удаления элементов
    - **_id_** - (*string | number*) - id элемента


~~~js
var dp = gantt.createDataProcessor({ 
   task: {
      create: function(data) {},
      update: function(data, id) {},
      delete: function(id) {}
   },
   link: {
      create: function(data) {},
      update: function(data, id) {},
      delete: function(id) {}
   }
});
~~~

Все функции роутеров должны возвращать либо Promise, либо объект с ответом данных. Это позволяет dataProcessor обновлять id в базе данных и вызывать событие **onAfterUpdate**.

~~~js
router = function(entity, action, data, id) {
    return new gantt.Promise(function(resolve, reject) {
        // … некоторая логика
        return resolve({tid: databaseId});
     });
}
~~~

Такой подход позволяет использовать DataProcessor для сохранения данных в localStorage или другое хранилище, не привязанное к конкретному URL, либо когда разные серверы обрабатывают создание и удаление объектов.


## Сохранение ресурсов и назначений ресурсов

По умолчанию DataProcessor не обрабатывает обновления ресурсов и назначений ресурсов. 
Вы можете включить эту возможность с помощью [отдельной конфигурации](guides/server-side.md#resources_crud).

### Related Guides
- [Интеграция с серверной стороной](guides/server-side.md)

### Change log
- опция **deleteAfterConfirmation** была добавлена в v8.0
