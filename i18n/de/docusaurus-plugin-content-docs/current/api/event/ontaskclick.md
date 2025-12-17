---
sidebar_label: onTaskClick
title: onTaskClick event
description: "Wird ausgelöst, wenn ein Benutzer auf eine Aufgabenzeile im Grid-Bereich klickt (einschließlich der 'expand/collapse' und 'add task' Buttons) oder auf eine Aufgabenleiste innerhalb des Timeline-Bereichs."
---

# onTaskClick

### Description

@short: Wird ausgelöst, wenn ein Benutzer auf eine Aufgabenzeile im Grid-Bereich klickt (einschließlich der 'expand/collapse' und 'add task' Buttons) oder auf eine Aufgabenleiste innerhalb des Timeline-Bereichs.

@signature: onTaskClick: (id: string | number, e?: Event) =\> boolean;

### Parameters

- `id` - (required) *string | number* - die ID der angeklickten Aufgabe

### Returns
- ` result` - (boolean) - gibt an, ob die Standardaktion des Events ausgeführt wird (<b>true</b>) oder verhindert wird (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onTaskClick", function(id,e){
    //beliebige benutzerdefinierte Logik hier
    return true;
});
~~~

### Details

Dieses Event kann blockiert werden. Die Rückgabe von false verhindert das Standardverhalten (welches das Auswählen einer Aufgabe ist).

### Related API
- [onTaskDblClick](api/event/ontaskdblclick.md)

