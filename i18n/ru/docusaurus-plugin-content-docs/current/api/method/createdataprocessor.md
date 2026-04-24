---
sidebar_label: createDataProcessor
title: метод createDataProcessor
description: "создает новый экземпляр dataProcessor и присоединяет его к gantt"
---

# createDataProcessor

### Description

@short: Создает новый экземпляр dataProcessor и присоединяет его к gantt

@signature: createDataProcessor: (config: DataProcessorConfig | RouterFunction | RouterConfig) => any

### Parameters

- `config` - (required) *DataProcessorConfig | RouterFunction | RouterConfig* - объект конфигурации dataProcessor

### Returns
- `dataProcessor` - (object) - объект dataProcessor

### Example

~~~jsx
var dp = gantt.createDataProcessor({
   url: "/api",
   mode: "REST",
   deleteAfterConfirmation: true
});
~~~

### Related samples
- [Пользовательский API данных - использование локального хранилища](https://docs.dhtmlx.com/gantt/samples/08_api/22_data_processor.html)

### Details

The method can take one of the following types of parameters:

- **DataProcessorConfig** - (*object*) - объект, задающий один из предопределённых режимов отправки данных
    - **_url_** - (*string*) - URL сервера
    - **_mode?_** - (*string*) - необязательный режим отправки данных на сервер: "JSON" | "REST-JSON" | "JSON" | "POST" | "GET"
    - **_deleteAfterConfirmation?_** - (*boolean*) - необязательный, определяет, должен ли элемент быть удалён из gantt только после успешного ответа от сервера. Связи зависимостей и подпроекты будут удалены после подтверждения удаления родительской задачи.


~~~js
var dp = gantt.createDataProcessor({
   url: "/api",
   mode: "REST",
   deleteAfterConfirmation: true
});
~~~


- **RouterFunction (entity, action, data, id): Promise | object | void** - функция-роутер для обработки изменений в Gantt
    - **_entity_** - (*string*) - имя соответствующей сущности. Возможные значения: "task"|"link"|"resource"|"assignment"
    - **_action_** - (*string*) - имя соответствующего действия. Возможные значения:  "create"|"update"|"delete"
    - **_data_** - (*Task | Link | ResourceAssignment | CustomObject*) - обработанный объект
    - **_id_** - (*string | number*) - идентификатор обработанного объекта


~~~js
// entity - "task"|"link"|"resource"|"assignment"
 // action - "create"|"update"|"delete"
 // data - an object with task or link data
 // id – the id of a processed object (task or link)
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


- **RouterConfig** - (*object*) - конфигурация роутера для различных сущностей
    - **_task?_** - (*RouterForEntity*) - объект роутера для задач
    - **_link?_** - (*RouterForEntity*) - объект роутера для связей
    - **_resource?_** - (*RouterForEntity*) - объект роутера для ресурсов
    - **_assignment?_** - (*RouterForEntity*) - объект роутера для назначений


Объект **RouterForEntity** имеет следующие свойства:

- **create (data): Promise** - функция обработки добавления элементов
    - **_data_** - (*Task | Link | ResourceAssignment | CustomObject*) - обрабатываемый элемент
- **update (data, id): Promise** - функция обработки обновления элементов
    - **_data_** - (*Task | Link | ResourceAssignment | CustomObject*) - обрабатываемый элемент
    - **_id_** - (*string | number*) - идентификатор обрабатываемого элемента
- **delete (id): Promise** - функция обработки удаления элементов
    - **_id_** - (*string | number*) - идентификатор обрабатываемого элемента


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


Все функции роутера должны возвращать либо Promise, либо объект ответа данных. Это необходимо для того, чтобы dataProcessor мог применить идентификатор из базы данных и привязать событие **onAfterUpdate** обработчика данных.

~~~js
router = function(entity, action, data, id) {
    return new gantt.Promise(function(resolve, reject) {
        // … some logic
        return resolve({tid: databaseId});
     });
}
~~~


Таким образом, вы можете использовать DataProcessor для сохранения данных в localStorage, или в любое другое хранилище, не привязанное к конкретному URL, или в случае, если существуют две разных сервера (URL), ответственные за создание и удаление объектов.


## Saving Resources and Resource Assignments

По умолчанию DataProcessor не получает обновления ресурсов и назначений ресурсов. 
Однако вы можете включить эту возможность через [отдельную конфигурацию](guides/server-side.md#resources_crud).

### Related Guides
- [Интеграция на стороне сервера](guides/server-side.md)

### Change log
- параметр **deleteAfterConfirmation** добавлен в версии v8.0