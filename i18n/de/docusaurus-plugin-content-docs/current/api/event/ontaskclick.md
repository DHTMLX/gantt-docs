---
sidebar_label: onTaskClick
title: onTaskClick event
description: "ruft auf, wenn der Benutzer im Grid-Bereich auf eine Aufgabenzeile klickt (einschließlich der 'Ausklappen/Einblenden'-Schaltflächen und 'Aufgabe hinzufügen') oder auf eine Aufgabenleiste im Timeline-Bereich"
---

# onTaskClick

### Description

@short: Ruft auf, wenn der Benutzer im Grid-Bereich auf eine Aufgabenzeile klickt (einschließlich der 'Ausklappen/Einblenden'-Schaltflächen und 'Aufgabe hinzufügen') oder auf eine Aufgabenleiste im Timeline-Bereich

@signature: onTaskClick: (id: string | number, e?: Event) =\> boolean;

### Parameters

- `id` - (erforderlich) *string | number* - die ID der angeklickten Aufgabe
- `e` - (optional) *Event* - ein natives Event-Objekt

### Returns
- ` result` - (boolean) - definiert, ob die Standardaktion des Events ausgelöst wird (<b>true</b>) oder abgebrochen wird (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onTaskClick", function(id,e){
    // Fügen Sie hier Ihre benutzerdefinierte Logik ein
    return true;
});
~~~

### Details

Das Event ist blockierbar. Gibt man false zurück, wird der Standard-Handler abgebrochen (Auswahl einer Aufgabe)

### Related API
- [onTaskDblClick](api/event/ontaskdblclick.md)