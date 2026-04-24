---
sidebar_label: serverList
title: serverList Methode
description: "gibt eine Liste von Optionen zurück"
---

# serverList

### Description

@short: Gibt eine Liste von Optionen zurück

@signature: serverList: (list_name: string | number, options?: any[]) =\> any[]

### Parameters

- `list_name` - (erforderlich) *string | number* - der Name einer Liste
-  `options` -	(optional) *array*	- ein Array von Optionen

### Returns
- ` list` - (array) - eine Liste von Optionen

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

- Wenn die Methode nur mit dem ersten Parameter aufgerufen wird, gibt die Methode eine Liste mit diesem Namen zurück (falls vorhanden).
- Wird die Methode mit 2 Parametern aufgerufen, erstellt dhtmlxGantt eine Liste mit dem angegebenen Namen und Optionen. Falls eine Liste mit diesem Namen bereits existiert, aktualisiert dhtmlxGantt die darin enthaltenen Daten.
- [Lightbox-Select-Steuerelemente](guides/select.md) können automatisch mit *gantt.serverList* befüllt werden.
Deshalb ist es sinnvoll, Sammlungen zu aktualisieren, z. B. Auswahloptionen, indem man sie als benannte Liste von Optionen erstellt.

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