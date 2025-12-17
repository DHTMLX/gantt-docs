---
sidebar_label: serverList
title: serverList method
description: "возвращает список опций"
---

# serverList

### Description

@short: Возвращает список опций

@signature: serverList: (list_name: string | number, options?: any[]) =\> any[]

### Parameters

- `list_name` - (required) *string | number* -         имя списка
- `options` - (optional) *array* - массив, содержащий опции

### Returns
- ` list` - (array) - массив опций

### Example

~~~jsx
// получает список опций с именем 'my_list'
var list = gantt.serverList("my_list"); 
...
// создаёт и возвращает список с заданными опциями
var list = gantt.serverList("options", [
    {key: 1, label: "John"},
    {key: 2, label: "Adam"},
    {key: 3, label: "Diane"}
]);
~~~

### Details

- При вызове с одним параметром метод возвращает список с указанным именем, если он существует.
- При вызове с двумя параметрами dhtmlxGantt создаёт список с заданным именем и опциями.
Если список с таким именем уже существует, его данные будут обновлены.
- [Lightbox select controls](guides/select.md) могут автоматически заполняться с помощью *gantt.serverList*.
При вызове с двумя параметрами dhtmlxGantt создаёт или обновляет список соответственно.

Такой подход удобно использовать для обновления коллекций, например, опций select, управляя ими как именованными списками.

~~~js
// эта настройка позволяет загружать опции 
// в элемент select из списка с именем 'persons'
gantt.config.lightbox.sections=[   
    {name:"description", height:130, map_to:"text", type:"textarea" , focus:true},
    {name:"persons", height:23, type:"select", 
    options:serverList("persons", persons_array), map_to:"section_id" }
]; 
~~~

### Related API
- [updateCollection](api/method/updatecollection.md)

