---
sidebar_label: serverList
title: serverList method
description: "gibt eine Liste von Optionen zurück"
---

# serverList

### Description

@short: Gibt eine Liste von Optionen zurück

@signature: serverList: (list_name: string | number, options?: any[]) =\> any[]

### Parameters

- `list_name` - (required) *string | number* - der Name der Liste
- `options` - (optional) *array* - ein Array, das die Optionen enthält

### Returns
- ` list` - (array) - ein Array von Optionen

### Example

~~~jsx
// ruft eine Optionsliste mit dem Namen 'my_list' ab
var list = gantt.serverList("my_list"); 
...
// erstellt und gibt eine Liste mit den angegebenen Optionen zurück
var list = gantt.serverList("options", [
    {key: 1, label: "John"},
    {key: 2, label: "Adam"},
    {key: 3, label: "Diane"}
]);
~~~

### Details

- Wenn die Methode nur mit dem ersten Parameter aufgerufen wird, gibt sie die Liste mit dem entsprechenden Namen zurück, falls diese existiert.
- Wenn die Methode mit zwei Parametern aufgerufen wird, erstellt dhtmlxGantt eine Liste mit dem angegebenen Namen und den Optionen.
Existiert bereits eine Liste mit dem gleichen Namen, werden deren Daten aktualisiert.
- [Lightbox select controls](guides/select.md) können automatisch mit *gantt.serverList* befüllt werden.
Wenn die Methode mit zwei Parametern aufgerufen wird, erstellt oder aktualisiert dhtmlxGantt die Liste entsprechend.

Dieser Ansatz erleichtert das Aktualisieren von Sammlungen wie Select-Optionen, indem sie als benannte Listen verwaltet werden.

~~~js
// diese Konfiguration ermöglicht das Laden von Optionen 
// in das Select-Element aus der Liste mit dem Namen 'persons'
gantt.config.lightbox.sections=[   
    {name:"description", height:130, map_to:"text", type:"textarea" , focus:true},
    {name:"persons", height:23, type:"select", 
    options:serverList("persons", persons_array), map_to:"section_id" }
]; 
~~~

### Related API
- [updateCollection](api/method/updatecollection.md)

