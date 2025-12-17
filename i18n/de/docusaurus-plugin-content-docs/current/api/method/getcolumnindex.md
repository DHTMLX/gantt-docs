---
sidebar_label: getColumnIndex
title: getColumnIndex method
description: "gibt die Position der Spalte basierend auf ihrem Namen zurück"
---

# getColumnIndex

### Description

@short: Gibt die Position der Spalte basierend auf ihrem Namen zurück

@signature: getColumnIndex: (name: string | number, excludeHidden?: boolean) =\> number

### Parameters

- `name` - (required) *string | number* - der Name der Spalte
- `excludeHidden` - (optional) *boolean* - ignoriert ausgeblendete Spalten bei der Zählung der Indizes

### Returns
- ` index` - (number) - die Position der Spalte

### Example

~~~jsx
var index = gantt.getColumnIndex("start_date"); // => 1
~~~

### Details

Wenn der Parameter `excludeHidden` auf *true* gesetzt ist, überspringt die Methode Spalten, die in der Konfiguration mit der Einstellung *hide:true* [versteckt](guides/specifying-columns.md#visibility) sind:

~~~js
gantt.config.columns = [
    {name: "text", label: "Task name", width: "*", tree: true, resize: true },
    {name: "start_date", label: "Start time" },
    {name: "duration", label: "Duration", width: 60, hide:true  }, /*!*/
    {name: "planned_start", label: "Planned start", hide:true  },  /*!*/
    {name: "planned_end", label: "Planned end", width:80, hide:true  }, /*!*/
    {name: "add", label: "", width: 36 }
];
 
gantt.init("gantt_here");

gantt.getColumnIndex("add"); // => 5 /*!*/
gantt.getColumnIndex("add", true); // => 2 /*!*/
~~~
