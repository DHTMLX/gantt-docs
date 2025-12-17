---
sidebar_label: updateCollection
title: updateCollection method
description: "обновляет указанную коллекцию с новыми опциями"
---

# updateCollection

### Description

@short: Обновляет указанную коллекцию с новыми опциями

@signature: updateCollection: (collection: string | number, options: any[]) =\> boolean

### Parameters

- `collection` - (required) *string | number* -         имя коллекции для обновления
- `options` - (required) *array* - новые значения коллекции

### Returns
- ` collection` - (boolean) - true, если обновление прошло успешно; false, если коллекция не найдена

### Example

~~~jsx
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"priority", height:22, map_to:"priority", type:"select", /*!*/     
        options:gantt.serverList("priorities", values_array)},     /*!*/                                                                
    {name:"time", height:72, type:"duration", map_to:"auto"}
];

gantt.updateCollection("priorities", new_values_array); /*!*/
~~~

### Details

- Этот метод вызывает событие [onOptionsLoad](api/event/onoptionsload.md) и обновляет lightbox. 
- Коллекции можно создавать изначально с помощью метода [serverList](api/method/serverlist.md).

## Примеры

#### Select control

Рассмотрим lightbox, сконфигурированный так:

~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"priority", map_to:"priority", type:"select", 
        options:gantt.serverList("priorities")},  /*!*/                                                                  
    {name:"time", height:72, type:"duration", map_to:"auto"}
];
~~~

С такой настройкой можно обновлять опции в select контроле через коллекцию с именем 'priorities'. <br>
Чтобы обновить коллекцию 'priorities', просто вызовите:
~~~js
gantt.updateCollection("priorities", new_priorities_array);
~~~

### Related API
- [serverList](api/method/serverlist.md)
- [onOptionsLoad](api/event/onoptionsload.md)

