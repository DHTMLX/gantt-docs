---
sidebar_label: onGridHeaderClick
title: onGridHeaderClick event
description: "Wird ausgelöst, wenn der Benutzer auf einen Grid-Header klickt"
---

# onGridHeaderClick

### Description

@short: Wird ausgelöst, wenn der Benutzer auf einen Grid-Header klickt

@signature: onGridHeaderClick: (name: string, e: Event) =\> boolean;

### Parameters

- `name` - (required) *string* - der Name-Attribut des angeklickten Spaltenheaders
- `e` - (required) *Event* - das native Event-Objekt

### Returns
- ` result` - (boolean) - bestimmt, ob die Standardaktion des Events ausgeführt wird (<b>true</b>) oder verhindert wird (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onGridHeaderClick", function(name, e){
    //benutzerdefinierte Logik kann hier hinzugefügt werden
    return true;
});
~~~

### Details

Das Zurückgeben von false verhindert das Standardverhalten, wie z.B. das Hinzufügen einer neuen Aufgabe über den "Plus"-Button oder das Sortieren der Spalte.
