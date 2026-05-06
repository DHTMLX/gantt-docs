---
sidebar_label: getColumnIndex
title: getColumnIndex Methode
description: "gibt den Index der Spalte anhand ihres Namens zurück"
---

# getColumnIndex

### Description

@short: Gibt den Index der Spalte anhand ihres Namens

@signature: getColumnIndex: (name: string | number, excludeHidden?: boolean) =\> number

### Parameters

- `name` - (required) *string | number* - der Name der Spalte
- `excludeHidden` - (optional) *boolean* - überspringt Indizes der versteckten Spalten

### Returns
- ` index` - (number) - der Index der Spalte

### Example

~~~jsx
var index = gantt.getColumnIndex("start_date"); // => 1
~~~

### Details

Wenn der `excludeHidden` Parameter auf *true* gesetzt ist, zählt die Methode die Spalten, die [hidden](guides/specifying-columns.md#visibility) über die Konfigurationsoption *hide:true* versteckt sind, nicht mit:

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