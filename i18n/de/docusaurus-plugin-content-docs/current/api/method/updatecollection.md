---
sidebar_label: updateCollection
title: updateCollection method
description: "aktualisiert die angegebene Sammlung mit neuen Optionen"
---

# updateCollection

### Description

@short: Aktualisiert die angegebene Sammlung mit neuen Optionen

@signature: updateCollection: (collection: string | number, options: any[]) =\> boolean

### Parameters

- `collection` - (erforderlich) *string | number* - der Name der Sammlung, die aktualisiert wird
- `options` - (erforderlich) *array* - die neuen Werte der Sammlung

### Returns
- `collection` - (boolean) - true, wenn das Update erfolgreich war; false, wenn die Sammlung nicht gefunden wurde

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

- Die Methode ruft das Event [onOptionsLoad](api/event/onoptionsload.md) auf und setzt das Lightbox-Fenster zurück. 
- Die Sammlung kann mit der Methode [serverList](api/method/serverlist.md) erstellt werden.

### Examples

#### Select control

Nehmen wir an, Sie haben die Lightbox wie folgt:

~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"priority", map_to:"priority", type:"select", 
        options:gantt.serverList("priorities")},  /*!*/
    {name:"time", height:72, type:"duration", map_to:"auto"}
];
~~~

Mit einer solchen Deklaration wäre es möglich, die Optionen im Auswahlfeld durch die Liste mit dem Namen 'priorities' zu aktualisieren. 
Um die Liste 'priorities' zu aktualisieren, können Sie Folgendes verwenden:
~~~js
gantt.updateCollection("priorities", new_priorities_array);
~~~

### Related API
- [serverList](api/method/serverlist.md)
- [onOptionsLoad](api/event/onoptionsload.md)