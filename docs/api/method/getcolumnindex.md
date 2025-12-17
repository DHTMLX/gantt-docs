---
sidebar_label: getColumnIndex
title: getColumnIndex method
description: "returns the index of the column by its name"
---

# getColumnIndex

### Description

@short: Returns the index of the column by its name

@signature: getColumnIndex: (name: string | number, excludeHidden?: boolean) =\> number

### Parameters

- `name` - (required) *string | number* - the name of the column
- `excludeHidden` - (optional) *boolean* - skips indexes of the hidden columns

### Returns
- ` index` - (number) - the index of the column

### Example

~~~jsx
var index = gantt.getColumnIndex("start_date"); // => 1
~~~

### Details

If the `excludeHidden` parameter is set to *true*, the method won't count the columns which are [hidden](guides/specifying-columns.md#visibility) via the *hide:true* option of the config:

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
