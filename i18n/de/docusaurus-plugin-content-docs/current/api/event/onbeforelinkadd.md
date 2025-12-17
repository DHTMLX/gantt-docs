---
sidebar_label: onBeforeLinkAdd
title: onBeforeLinkAdd event
description: "Wird ausgelöst, kurz bevor ein neuer Link zum Gantt-Diagramm hinzugefügt wird"
---

# onBeforeLinkAdd

### Description

@short: Wird ausgelöst, kurz bevor ein neuer Link zum Gantt-Diagramm hinzugefügt wird

@signature: onBeforeLinkAdd: (id: string | number, link: Link) =\> boolean;

### Parameters

- `id` - (required) *string | number* - die ID des Links
- `link` - (required) *Link* - Das Link-Objekt

### Returns
- ` result` - (boolean) - Bestimmt, ob die Standardaktion des Events ausgeführt wird (<b>true</b>) oder abgebrochen wird (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeLinkAdd", function(id,link){
    //Hier kann benutzerdefinierte Logik hinzugefügt werden
    return true;
});
~~~

### Details

Dieses Event kann blockiert werden. Wenn *false* zurückgegeben wird, wird das Hinzufügen des Links verhindert.

~~~js
//Verhindert, dass die Quellaufgabe die Zielaufgabe überlappt,
//wenn "finish_to_start"-Links erstellt werden
gantt.attachEvent("onBeforeLinkAdd", function(id, link){
    if (link.type == 0){
        var sourceTask = gantt.getTask(link.source);
        var targetTask = gantt.getTask(link.target);
        if (sourceTask.end_date >= targetTask.start_date){
            alert("Dieser Link ist ungültig")
            return false;
        }
    }
});
~~~

### Related API
- [addLink](api/method/addlink.md)

