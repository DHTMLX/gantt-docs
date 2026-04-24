---
sidebar_label: updateCollection
title: updateCollection method
description: "Обновляет указанную коллекцию новыми опциями"
---

# updateCollection

### Description

@short: Обновляет указанную коллекцию новыми опциями

@signature: updateCollection: (collection: string | number, options: any[]) =\> boolean

### Parameters

- `collection` - (required) *string | number* - имя коллекции, которую нужно обновить
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

- Метод вызывает событие [onOptionsLoad](api/event/onoptionsload.md) и сбрасывает lightbox.
- Коллекция может быть создана с помощью метода [serverList](api/method/serverlist.md).

### Examples

#### Контроль select

Предположим, что у вас lightbox, как показано ниже:

~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"priority", map_to:"priority", type:"select", 
        options:gantt.serverList("priorities")},  /*!*/
    {name:"time", height:72, type:"duration", map_to:"auto"}
];
~~~

Такое объявление позволит обновлять опции в контроле select через список с именем 'priorities'. 
Чтобы обновить список 'priorities', можно использовать:
~~~js
gantt.updateCollection("priorities", new_priorities_array);
~~~

### Related API
- [serverList](api/method/serverlist.md)
- [onOptionsLoad](api/event/onoptionsload.md)