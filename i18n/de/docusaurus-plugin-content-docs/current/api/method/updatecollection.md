---
sidebar_label: updateCollection
title: updateCollection method
description: "aktualisiert die angegebene Collection mit neuen Optionen"
---

# updateCollection

### Description

@short: Aktualisiert die angegebene Collection mit neuen Optionen

@signature: updateCollection: (collection: string | number, options: any[]) =\> boolean

### Parameters
- `collection` - (required) *string | number* - der Name der zu aktualisierenden Collection
- `options` - (required) *array* - die neuen Werte der Collection

### Returns
- ` collection` - (boolean) - true, wenn die Aktualisierung erfolgreich war; false, wenn die Collection nicht gefunden wurde

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

- Diese Methode löst das [onOptionsLoad](api/event/onoptionsload.md) Event aus und aktualisiert das Lightbox-Interface. 
- Collections können initial mit der [serverList](api/method/serverlist.md) Methode erstellt werden.

## Beispiele

#### Select control

Betrachten Sie eine Lightbox, die wie folgt konfiguriert ist:

~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"priority", map_to:"priority", type:"select", 
        options:gantt.serverList("priorities")},  /*!*/                                                                  
    {name:"time", height:72, type:"duration", map_to:"auto"}
];
~~~

Mit dieser Konfiguration ist es möglich, die Optionen im Select-Control über die Collection namens 'priorities' zu aktualisieren. <br>
Um die 'priorities' Collection zu aktualisieren, rufen Sie einfach auf:
~~~js
gantt.updateCollection("priorities", new_priorities_array);
~~~

### Related API
- [serverList](api/method/serverlist.md)
- [onOptionsLoad](api/event/onoptionsload.md)

