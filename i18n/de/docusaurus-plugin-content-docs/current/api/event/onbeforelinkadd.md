---
sidebar_label: onBeforeLinkAdd
title: onBeforeLinkAdd-Ereignis
description: "wird ausgelöst, bevor eine neue Verbindung dem Gantt-Diagramm hinzugefügt wird"
---

# onBeforeLinkAdd

### Description

@short: Wird ausgelöst, bevor eine neue Verbindung dem Gantt-Diagramm hinzugefügt wird

@signature: onBeforeLinkAdd: (id: string | number, link: Link) =\> boolean;

### Parameters

- `id` - (erforderlich) *string | number* - die Link-ID
- `link` - (erforderlich) *Link* - das Link-Objekt

### Returns
- ` result` - (boolean) - gibt an, ob die Standardaktion des Ereignisses ausgelöst wird (<b>true</b>) oder abgebrochen wird (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeLinkAdd", function(id,link){
    // Fügen Sie hier Ihre benutzerdefinierte Logik ein
    return true;
});
~~~

### Details

Das Ereignis ist blockierbar. Geben Sie *false* zurück, um das Hinzufügen der Verbindung abzubrechen.

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