---
sidebar_label: serverList
title: serverList method
description: "возвращает список опций"
---

# serverList

### Description

@short: Возвращает список опций

@signature: serverList: (list_name: string | number, options?: any[]) => any[]

### Parameters

- `list_name` - (обязательный) *string | number* - название списка
-  `options` -	(необязательный) *array*	- массив опций

### Returns
- ` list` - (array) - список опций

### Example

~~~jsx
//returns a list of options with the name 'my_list'
var list = gantt.serverList("my_list"); 
...
//creates and returns the specified list
var list = gantt.serverList("options", [
    {key: 1, label: "John"},
    {key: 2, label: "Adam"},
    {key: 3, label: "Diane"}
]);
~~~

### Details

- Если метод вызывается только с первым параметром, метод вернет список с указанным именем (если он существует).
- Если метод вызывается с двумя параметрами, dhtmlxGantt создаст список с указанным именем и опциями.
  Если список с таким именем уже существует, dhtmlxGantt обновит данные в нем.
- [Lightbox select controls](guides/select.md) можно автоматически заполнить с помощью *gantt.serverList*.
  Если метод вызывается с двумя параметрами, dhtmlxGantt создаст список с указанным именем и опциями.
  Если список с таким именем уже существует, dhtmlxGantt обновит данные в нем.

- Поэтому, если нужно обновлять коллекции, например опции для select, имеет смысл создавать их как именованный список опций.

~~~js
// with such declaration it would be possible to load options 
// into the select element from the list named 'persons'
gantt.config.lightbox.sections=[   
    {name:"description", height:130, map_to:"text", type:"textarea" , focus:true},
    {name:"persons", height:23, type:"select", 
    options:serverList("persons", persons_array), map_to:"section_id" }
]; 
~~~

### Related API
- [updateCollection](api/method/updatecollection.md)